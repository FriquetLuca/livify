import type { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import fs from "fs";
import path from "path";
import { CONTENT_TYPE, type ContentTypeExtension } from "../../http";
import { directoryAllFiles } from "../../fs";
import { patchPrefix } from "./patchPrefix";
import { type FileData } from ".";
import { loadMetadata, type LocationFileMeta } from "./loadMetadata";
import { sendFile } from "./sendFile";

export interface StaticFileOption {
    location: string;
    prefix?: string;
    locationHandler?: (file: FileData) => FileData | FileData[];
    fileHandler?: (file: FileData, req: FastifyRequest, rep: FastifyReply) => FastifyReply;
}

export function staticFiles(fastify: FastifyInstance, options: StaticFileOption) {
    if(fs.existsSync(options.location)) {
        const prefix = patchPrefix(options.prefix ?? "");
        const files = directoryAllFiles(options.location);
        for(const location of files) {
            const contentType = CONTENT_TYPE[path.extname(location) as ContentTypeExtension] ?? "application/octet-stream";
            const route = `${prefix}${path.relative(options.location, location).replaceAll("\\", "/")}`;
            const allLocations = options.locationHandler
                ? options.locationHandler({ contentType, location, route, })
                : { contentType, location, route, };
            if(Array.isArray(allLocations)) {
                for(const file of allLocations) {
                    createStaticFileRoute(fastify, file, options);
                }
            } else {
                createStaticFileRoute(fastify, allLocations, options);
            }
        }
    }
}

export function createStaticFileRoute(fastify: FastifyInstance, file: FileData, options: StaticFileOption) {
    if (file.skip) return;

    if (!fs.existsSync(file.location)) return;

    const stats = fs.statSync(file.location);
    if (!stats.isFile()) return;

    const fileMeta = loadMetadata<LocationFileMeta>(file.location, { hidden: false, });

    fastify.get(file.route, async (req, rep) => {
        if (options.fileHandler) {
            return options.fileHandler(file, req, rep);
        }
        return sendFile(options.location, file, fileMeta, stats.size, req, rep);
    });
}
