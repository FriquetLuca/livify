import path from 'path';
import fs from 'fs';
import type { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
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
import type { LocationDirectoryMeta, LocationFileMeta } from './loadMetadata';
import { sendFile } from './sendFile';
import { hasAccess } from './hasAccess';

export interface DynamicFileOption {
    location: string;
    templateLocation: string;
    allowLatex?: boolean;
    emojis?: Record<string, EmojiRecord>;
    prefix?: string;
    sanitize?: boolean;
    disableDefaultIndexing?: boolean;
    fileHandler?: (file: FileData, fileMeta: LocationFileMeta, options: DynamicFileOption, req: FastifyRequest, rep: FastifyReply) => MaybePromise<FastifyReply>;
    overrideIndexGeneration?: (file: FileData, options: DynamicFileOption) => MaybePromise<fs.ReadStream | ServerResponse<IncomingMessage> | Transform | string | Buffer>;
}

export function dynamicFiles(fastify: FastifyInstance, options: DynamicFileOption) {
    if(fs.existsSync(options.location)) {
        const prefix = patchPrefix(options.prefix ?? "");
        fastify.get(`${prefix}*`, async (req, rep) => {
            const requestUrl = req.originalUrl.substring(prefix.length - 1, req.originalUrl.length);
            const ext = path.extname(requestUrl) as ContentTypeExtension | ".livify";
            if(ext === ".livify") {
                return rep.code(404).send({ message: `Route GET:${req.originalUrl} not found`, error: "Not Found" });
            }
            const currentFile: FileData = {
                contentType: CONTENT_TYPE[ext] ?? "application/octet-stream",
                location: decodeURIComponent(path.join(options.location, requestUrl)),
                route: requestUrl,
            };
            const unknownMetas = loadMetadata<{ hidden: boolean }>(currentFile.location, { hidden: false, });
            if(fs.existsSync(currentFile.location)) {
                const stats = fs.statSync(currentFile.location);
                if(stats.isFile()) {
                    const fileMeta: LocationFileMeta = unknownMetas;
                    if(options.fileHandler) {
                        if(!hasAccess(options.location, currentFile.location)) {
                            return rep.code(404).send({ message: `Route GET:${req.originalUrl} not found`, error: "Not Found" });
                        }
                        return await options.fileHandler(currentFile, fileMeta, options, req, rep);
                    }
                    if(path.extname(currentFile.location) === ".md") {
                        if(!hasAccess(options.location, currentFile.location)) {
                            return rep.code(404).send({ message: `Route GET:${req.originalUrl} not found`, error: "Not Found" });
                        }
                        if(fileMeta.file?.disposition) {
                            if(fileMeta.file.disposition === "attachment" && fileMeta.file.filename) {
                                rep.header('Content-Disposition', `attachment; filename="${fileMeta.file.filename}"`);
                            } else {
                                rep.header('Content-Disposition', fileMeta.file.disposition);
                            }
                        }
                        return rep.code(200).type("text/html").send(await generateHTMLFromMarkdownFile(currentFile.location, fileMeta.title ?? path.basename(currentFile.location), options.location, { ...options, location: currentFile.location }));
                    }
                    return sendFile(options.location, currentFile, fileMeta, stats.size, req, rep);
                } else if (stats.isDirectory()) {
                    const directoryMeta: LocationDirectoryMeta = unknownMetas;
                    const possibleIndexHTML = path.join(currentFile.location, "index.html");
                    if(fs.existsSync(possibleIndexHTML)) {
                        const currentFile: FileData = {
                            contentType: "text/html",
                            location: possibleIndexHTML,
                            route: requestUrl,
                        };
                        const fileMeta = loadMetadata<LocationFileMeta>(currentFile.location, { hidden: false, });
                        return sendFile(options.location, currentFile, fileMeta, stats.size, req, rep);
                    }

                    const possibleIndexMD = path.join(currentFile.location, "index.md");                    
                    if(fs.existsSync(possibleIndexMD)) {
                        if(!hasAccess(options.location, possibleIndexMD)) {
                            return rep.code(404).send({ message: `Route GET:${req.originalUrl} not found`, error: "Not Found" });
                        }
                        const fileMeta = loadMetadata<LocationFileMeta>(possibleIndexMD, { hidden: false, });
                        if(fileMeta.file?.disposition) {
                            if(fileMeta.file.disposition === "attachment" && fileMeta.file.filename) {
                                rep.header('Content-Disposition', `attachment; filename="${fileMeta.file.filename}"`);
                            } else {
                                rep.header('Content-Disposition', fileMeta.file.disposition);
                            }
                        }
                        return rep.code(200).type("text/html").send(await generateHTMLFromMarkdownFile(possibleIndexMD, fileMeta.title ?? "Index", options.location, { ...options, location: possibleIndexMD, }));
                    }
                    
                    if(directoryMeta.indexed ?? true) {
                        if(!hasAccess(options.location, currentFile.location)) {
                            return rep.code(404).send({ message: `Route GET:${req.originalUrl} not found`, error: "Not Found" });
                        }
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
                                    `# ${directoryMeta?.title ?? currentLocation.name}`,
                                    `## Index`,
                                ];
                                if(!currentLocation.isRoot) {
                                    pageLinks.push(`- <a class="md-link" href="${dirname}">${dirname === "/" ? ".." : `../${decodeURIComponent(path.basename(dirname))}`}</a>`);
                                }
                                for(const item of (currentLocation as LocationDirectory).content) {
                                    const ext = path.extname(item.path);
                                    if(ext !== ".livify") {
                                        if(!hasAccess(options.location, path.join(options.location, item.relativePath))) {
                                            continue;
                                        }
                                        if(item.type === "directory") {
                                            if(item.hasMeta) {
                                                const metaData = loadMetadata<LocationDirectoryMeta>(item.relativePath, { });
                                                pageLinks.push(`- <a class="md-link" href="${item.relativePath}">${metaData?.title ?? decodeURIComponent(path.basename(item.path))}</a>`);
                                            } else {
                                                pageLinks.push(`- <a class="md-link" href="${item.relativePath}">${decodeURIComponent(path.basename(item.path))}</a>`);
                                            }
                                        } else {
                                            if(item.hasMeta) {
                                                const metaData = loadMetadata<LocationFileMeta>(item.relativePath, { });
                                                pageLinks.push(`- <a class="md-link" href="${item.relativePath}" target="_blank" rel="noopener">${metaData?.title ?? decodeURIComponent(path.basename(item.path))}</a>`);
                                            } else {
                                                pageLinks.push(`- <a class="md-link" href="${item.relativePath}" target="_blank" rel="noopener">${decodeURIComponent(path.basename(item.path))}</a>`);
                                            }
                                        }
                                    }
                                }
                                return rep.code(200).type("text/html").send(await generateHTMLFromMarkdown(pageLinks.join("\r\n"), options.templateLocation, "Index", options.location, options));
                            }
                        }
                        return rep.code(500).send({ message: `Error 500 - Internal Server Error`, error: "Internal Server Error" });
                    }
                }
            }
            return rep.code(404).send({ message: `Route GET:${req.originalUrl} not found`, error: "Not Found" });
        })
    }
}
