import {
  loadMetadata,
  type LocationDirectory,
  type LocationDirectoryMeta,
  type LocationFileMeta,
  locationTree,
} from "../secludify";
import fs from "fs";
import path from "path";
import { generateHTMLFromMarkdown, generateHTMLFromMarkdownFile } from '.';
import { findLocationInTreeRoute } from '../secludify/server/files/findRelativeInTree';
import { sortLocationTree } from '../secludify/server/files/sortLocationTree';
import { type EmojiRecord } from 'mkimp';
import { hasAccess } from '../secludify/server/files/hasAccess';
import { removeExt } from "../utils/removeExt";

export async function generateMarkdownFile(options: {
  sanitize: boolean;
  root: string;
  disableIndexing: boolean;
  override: boolean;
  emojis: Record<string, EmojiRecord>;
  template: string;
  output: string;
  input: string;
  full: boolean;
}) {
  const unknownMetas = loadMetadata<{ hidden: boolean }>(options.input, { hidden: false, });
  const currentInputStats = fs.statSync(options.input);
  const isInputFile = currentInputStats.isFile() ? true : currentInputStats.isDirectory() ? false : null;
  if(isInputFile) {
    const inputExt = path.extname(options.input);
    // Skip metadata
    if(inputExt === ".livify") {
      return;
    }
    // Unauthorized
    if(!hasAccess(options.root, options.input)) {
      return;
    }
    // Any resources
    if(inputExt !== ".md") {
      const out = path.join(options.output, path.relative(options.root, options.input));
      fs.mkdirSync(path.dirname(out), { recursive: true });
      fs.copyFileSync(options.input, out);
      return;
    }
    const fileMeta: LocationFileMeta = unknownMetas;
    const content = await generateHTMLFromMarkdownFile(options.input, fileMeta.title ?? path.basename(options.input), options.root, {
      location: options.input,
      emojis: options.emojis,
      templateLocation: options.template,
      sanitize: options.sanitize,
    });
    const out = `${path.join(options.output, path.relative(options.root, removeExt(options.input)))}.html`;
    fs.mkdirSync(path.dirname(out), { recursive: true });
    fs.writeFileSync(out, content, "utf-8");
  } else {
    // Unauthorized
    if(!hasAccess(options.root, options.input)) {
      return;
    }
    // Default index.html
    const possibleHTMLIndex = path.join(options.input, "index.html");
    if(fs.existsSync(possibleHTMLIndex)) {
      return;
    }
    // Default index.md
    const possibleIndexMD = path.join(options.input, "index.md");
    if(fs.existsSync(possibleIndexMD)) {
      return;
    }
    // Generate markdown index
    const directoryMeta: LocationDirectoryMeta = unknownMetas;
    if(directoryMeta.indexed ?? !options.disableIndexing) {
      const tree = locationTree(options.input);
      if(tree) {
        const currentLoc = findLocationInTreeRoute(options.input, tree);
        if(currentLoc) {
          const currentLocation = sortLocationTree(currentLoc);
          const indexContent = `# ${currentLocation.name}\r\n\r\n## Index\r\n\r\n`;
          const dirname = path.dirname(options.input);
          const pageLinks: string[] = [];
          if(!currentLocation.isRoot) {
            pageLinks.push(`- <a href="${dirname}">..</a>`);
          }
          for(const item of (currentLocation as LocationDirectory).content) {
            pageLinks.push(`- <a href="${item.relativePath}">${path.basename(item.path)}</a>`);
          }
          const content = await generateHTMLFromMarkdown(`${indexContent}${pageLinks.join("\r\n")}`, options.template, "Index", options.root, {
            location: '',
            emojis: options.emojis,
            templateLocation: options.template,
            sanitize: options.sanitize,
          });
          const out = path.join(options.output, path.relative(options.root, options.input), "index.html");
          fs.mkdirSync(path.dirname(out), { recursive: true });
          fs.writeFileSync(out, content, "utf-8");
        }
      } else {
        throw new Error("Could not generate the location tree");
      }
    }
  }
}
