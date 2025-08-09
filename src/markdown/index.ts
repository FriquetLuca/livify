import { MkImp, type EmojiRecord } from 'mkimp';
import fs from 'fs';
import { type DynamicFileOption } from '../secludify/server/files/dynamicFiles';
import jsyaml from 'js-yaml';
import path from 'path';
import { JSDOM } from 'jsdom';
import DOMPurify from 'dompurify';

type IncludeOpt = {
    baseDir: string,
    templateLoc: string,
};

export type ParseMarkdownOption = Partial<{
    include: IncludeOpt,
    latexParser: Partial<{
        highlightTarget: "minted"|"listings"|"none"
    }>,
    toLatex: boolean,
    allowLatex: boolean,
    emojis: Record<string, EmojiRecord>,
    metadatas: Record<string, string>,
    sanitize: boolean,
}>;

const parseMarkdown = async (content: string, options: ParseMarkdownOption = {}) => {
    const metadata = new Map<string, string>();
    if(options?.metadatas) {
        for(const metadataName in options.metadatas) {
            metadata.set(metadataName, options.metadatas[metadataName]);
        }
    }
    const mkimp = new MkImp({
        emojis: options?.emojis,
        metadata,
        async frontMatter(content) {
            return jsyaml.load(content, {});
        },
        async include(location, from, to) {
            if(options.include) {
                const fullPath = path.resolve(options.include?.baseDir, location);
                if(fs.existsSync(fullPath) && fs.statSync(fullPath).isFile()) {
                    const fileContent = fs.readFileSync(fullPath, "utf-8");
                    if(from === undefined && to === undefined) {
                        return fileContent;
                    }
                    const filelines = fileContent.split(/\r?\n/);
                    const newFrom = from ? from - 1 : 0;
                    const newTo = to ? to : filelines.length - 1;
                    return filelines.slice(newFrom, newTo).join('\n');
                }
            }
            return undefined;
        },
        async includeCode(location, from, to) {
            if(options.include) {
                const fullPath = path.resolve(options.include?.baseDir, location);
                if(fs.existsSync(fullPath) && fs.statSync(fullPath).isFile()) {
                    const fileContent = fs.readFileSync(fullPath, "utf-8");
                    if(from === undefined && to === undefined) {
                        return fileContent;
                    }
                    const filelines = fileContent.split(/\r?\n/);
                    const newFrom = from ? from - 1 : 0;
                    const newTo = to ? to : filelines.length - 1;
                    return filelines.slice(newFrom, newTo).join('\n');
                }
            }
            return undefined;
        },
    });
    const rootToken = await mkimp.ast(content);
    const htmlContent = await mkimp.render(rootToken);
    if(options.include) {
        let html = fs.readFileSync(options.include.templateLoc, { encoding: "utf-8" });
        for(const [key, value] of rootToken.metadata) {
            html = html.replaceAll(`{{${key}}}`, typeof value === "string" ? value : value.toString());
        }
        if(options.sanitize) {
            const window = new JSDOM('').window;
            const purify = DOMPurify(window);
            return html.replace(/%PAGE_CONTENT%/g, () => purify.sanitize(htmlContent));
        }
        return html.replace(/%PAGE_CONTENT%/g, () => htmlContent);
    }
    if(options.sanitize) {
        const window = new JSDOM('').window;
        const purify = DOMPurify(window);
        return purify.sanitize(htmlContent);
    }
    return htmlContent;
};

export async function generateHTMLFromMarkdown(mdContent: string, template: string, _title: string, location: string, options: DynamicFileOption) {
    return await parseMarkdown(mdContent, {
        include: {
            baseDir: location,
            templateLoc: template,
        },
        emojis: options.emojis,
        allowLatex: options.allowLatex,
        metadatas: {
            _title,
            _lang: "en",
        },
        sanitize: options.sanitize??false,
    });
}

export async function generateHTMLFromMarkdownFile(mdLocation: string, title: string, location: string, options: DynamicFileOption) {
    const mdContent = fs.readFileSync(mdLocation, { encoding: "utf-8" });
    return await generateHTMLFromMarkdown(mdContent, options.templateLocation, title, location, options);
}
