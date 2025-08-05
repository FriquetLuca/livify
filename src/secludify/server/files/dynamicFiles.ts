import path from 'path';
import fs from 'fs';
import type { FastifyInstance } from 'fastify';
import { patchPrefix } from './patchPrefix';
import { CONTENT_TYPE, type ContentTypeExtension } from '../../http';
import { loadMetadata, type LocationDirectory, locationTree, type FileData } from '.';
import type { IncomingMessage, ServerResponse } from 'http';
import type { Transform } from 'stream';
import { type MaybePromise } from '../../functional';
import { generateHTMLFromMarkdown, generateHTMLFromMarkdownFile } from '../../../markdown';
import { findLocationInTreeRoute } from './findRelativeInTree';
import { sortLocationTree } from './sortLocationTree';
import { type EmojiRecord } from 'mkimp';

export type DynamicFileOption = {
    location: string,
    templateLocation: string,
    allowLatex?: boolean,
    emojis?: Record<string, EmojiRecord>,
    prefix?: string,
    metaext?: string,
    sanitize?: boolean,
    disableDefaultIndexing?: boolean,
    locationHandler?: (file: FileData, options: DynamicFileOption) => FileData,
    fileHandler?: (file: FileData, options: DynamicFileOption) => MaybePromise<fs.ReadStream | ServerResponse<IncomingMessage> | Transform | string | Buffer>,
    overrideIndexGeneration?: (file: FileData, options: DynamicFileOption) => MaybePromise<fs.ReadStream | ServerResponse<IncomingMessage> | Transform | string | Buffer>,
};

export function dynamicFiles(fastify: FastifyInstance, options: DynamicFileOption) {
    if(fs.existsSync(options.location)) {
        const prefix = patchPrefix(options.prefix ?? "");
        fastify.get(`${prefix}*`, async (req, rep) => {
            const requestUrl = req.originalUrl.substring(prefix.length - 1, req.originalUrl.length);
            const ext = path.extname(requestUrl) as ContentTypeExtension;
            if(ext === (options.metaext ?? ".livify")) {
                return rep.code(404).send({ message: `Route GET:${req.originalUrl} not found`, error: "Not Found" });
            }
            const file = {
                contentType: CONTENT_TYPE[ext] ?? "application/octet-stream",
                location: decodeURIComponent(path.join(options.location, requestUrl)),
                route: requestUrl,
            };
            const currentFile: FileData = (options.locationHandler && options.locationHandler(file, options)) ?? file;
            const unknownMetas = loadMetadata<{ hidden: boolean }>(currentFile.location, { hidden: false, }, options.metaext);
            if(unknownMetas.hidden) {
                return rep.code(404).send({ message: `Route GET:${req.originalUrl} not found`, error: "Not Found" });
            }
            if(fs.existsSync(currentFile.location)) {
                const stats = fs.statSync(currentFile.location);
                if(stats.isFile()) {
                    const fileMeta: LocationFileMeta = unknownMetas;
                    if(fileMeta.file?.disposition) {
                        if(fileMeta.file.disposition === "attachment" && fileMeta.file.filename) {
                            rep.header('Content-Disposition', `attachment; filename="${fileMeta.file.filename}"`);
                        } else {
                            rep.header('Content-Disposition', fileMeta.file.disposition);
                        }
                    }
                    if(options.fileHandler) {
                        return rep.code(200).type(currentFile.contentType).send(await options.fileHandler(currentFile, options));
                    }
                    if(path.extname(currentFile.location) === ".md") {
                        return rep.code(200).type("text/html").send(await generateHTMLFromMarkdownFile(file.location, fileMeta.title ?? path.basename(currentFile.location), options.location, options));
                    }
                    return rep.code(200).type(currentFile.contentType).send(fs.createReadStream(currentFile.location));
                } else if (stats.isDirectory()) {
                    const directoryMeta: LocationDirectoryMeta = unknownMetas;
                    if(directoryMeta.unlinkIndex === true) {
                        return rep.code(404).send({ message: `Route GET:${req.originalUrl} not found`, error: "Not Found" });
                    }
                    const possibleIndexHTML = path.join(currentFile.location, "index.html");
                    const possibleIndexMD = path.join(currentFile.location, "index.md");
                    if(fs.existsSync(possibleIndexHTML)) {
                        const fileMeta = loadMetadata<LocationFileMeta>(possibleIndexMD, { hidden: false, }, options.metaext);
                        if(fileMeta.file?.disposition) {
                            if(fileMeta.file.disposition === "attachment" && fileMeta.file.filename) {
                                rep.header('Content-Disposition', `attachment; filename="${fileMeta.file.filename}"`);
                            } else {
                                rep.header('Content-Disposition', fileMeta.file.disposition);
                            }
                        }
                        return rep.code(200).type("text/html").send(fs.createReadStream(possibleIndexHTML));
                    } else if(fs.existsSync(possibleIndexMD)) {
                        const fileMeta = loadMetadata<LocationFileMeta>(possibleIndexMD, { hidden: false, }, options.metaext);
                        if(fileMeta.file?.disposition) {
                            if(fileMeta.file.disposition === "attachment" && fileMeta.file.filename) {
                                rep.header('Content-Disposition', `attachment; filename="${fileMeta.file.filename}"`);
                            } else {
                                rep.header('Content-Disposition', fileMeta.file.disposition);
                            }
                        }
                        return rep.code(200).type("text/html").send(await generateHTMLFromMarkdownFile(possibleIndexMD, fileMeta.title ?? "Index", options.location, options));
                    } else {
                        if(directoryMeta.indexed ?? !(options.disableDefaultIndexing ?? false)) {
                            if(options.overrideIndexGeneration) {
                                return rep.code(200).type("text/html").send(await options.overrideIndexGeneration(currentFile, options));
                            }
                            // Create an index for the directory since it's indexed
                            const tree = locationTree(options.location, { prefix });
                            if(tree) {
                                const removeTrailingSlashes = (content: string): string => {
                                    return content.endsWith("/") || content.endsWith("\\") ? removeTrailingSlashes(content.substring(0, content.length - 1)) : content;
                                };
                                const fileLocation = removeTrailingSlashes(currentFile.location);
                                const currentLoc = findLocationInTreeRoute(fileLocation, tree);
                                if(currentLoc) {
                                    const currentLocation = sortLocationTree(currentLoc);
                                    const dirname = path.dirname(currentFile.route);
                                    const pageLinks: string[] = [
                                        `# ${currentLocation.name}`,
                                        `## Index`,
                                    ];
                                    if(!currentLocation.isRoot) {
                                        pageLinks.push(`- [..](${dirname})`);
                                    }
                                    for(const item of (currentLocation as LocationDirectory).content) {
                                        const ext = path.extname(item.path);
                                        if(ext !== ".livify") {
                                            pageLinks.push(`- [${path.basename(item.path)}](${item.relativePath})`);
                                        }
                                    }
                                    return rep.code(200).type("text/html").send(await generateHTMLFromMarkdown(pageLinks.join("\r\n"), options.templateLocation, "Index", options.location, options));
                                }
                            }
                            return rep.code(500).send({ message: `Error 500 - Internal Server Error`, error: "Internal Server Error" });
                        }
                        return rep.code(404).send({ message: `Route GET:${req.originalUrl} not found`, error: "Not Found" });
                    }
                } else {
                    return rep.code(404).send({ message: `Route GET:${req.originalUrl} not found`, error: "Not Found" });
                }
            } else {
                return rep.code(404).send({ message: `Route GET:${req.originalUrl} not found`, error: "Not Found" });
            }
        })
    }
}

type LocationMetaFileAttachment = Partial<{
    disposition: "attachment"|"inline",
    filename: string,
}>;
type LocationFileMeta = Partial<{
    title: string,
    file: LocationMetaFileAttachment,
    hidden: boolean,
}>;
type LocationDirectoryMeta = Partial<{
    title: string,
    indexed: boolean,
    hidden: boolean,
    unlinkIndex: boolean,
}>;
