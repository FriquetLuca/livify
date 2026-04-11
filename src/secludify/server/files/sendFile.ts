import type { FastifyReply, FastifyRequest } from "fastify";
import { type FileData } from ".";
import { acceptRanges } from "./acceptRanges";
import fs from "fs";
import { type LocationFileMeta } from "./loadMetadata";
import { speedLimit } from "./speedLimit";
import { isRateLimited } from "./isRateLimited";
import { hasAccess } from "./hasAccess";

export function sendFile(location: string, file: FileData, fileMeta: LocationFileMeta, fileSize: number, req: FastifyRequest, rep: FastifyReply) {
    if(!hasAccess(location, file.location)) {
        return rep.code(404).send({ message: `Route GET:${req.originalUrl} not found`, error: "Not Found" });
    }

    const range = acceptRanges(req, fileSize);

    if(fileMeta?.reqLimit && !range && isRateLimited(req.ip, file.location, fileMeta.reqLimit, fileMeta.reqWindowLimit)) {
        return rep.code(429).send({ message: `Route GET:${req.originalUrl} has too many requests`, error: "Too Many Requests" });
    }
    
    const contentDisposition = {
        disposition: fileMeta.file?.disposition ?? file.disposition,
        filename: fileMeta.file?.filename ?? file.filename,
    };
    if (contentDisposition.disposition) {
        if (contentDisposition.disposition === "attachment" && contentDisposition.filename) {
            rep.header('Content-Disposition', `attachment; filename="${contentDisposition.filename}"`);
        } else {
            rep.header('Content-Disposition', contentDisposition.disposition);
        }
    }

    rep.header('Accept-Ranges', 'bytes');

    if (!range) {
        rep.header('Content-Length', fileSize);
        const stream = fs.createReadStream(file.location);
        if(fileMeta.throttle) {
            const throttled = stream.pipe(speedLimit(1024 * fileMeta.throttle));
            return rep
                .code(200)
                .type(file.contentType)
                .send(throttled);
        }
        return rep
            .code(200)
            .type(file.contentType)
            .send(stream);
    }

    const [start, end] = range;

    if (isNaN(start) || isNaN(end) || start > end || end >= fileSize) {
        rep.header('Content-Range', `bytes */${fileSize}`);
        return rep.code(416).send(); // Range Not Satisfiable
    }

    const chunkSize = (end - start) + 1;

    rep
        .code(206)
        .header('Content-Range', `bytes ${start}-${end}/${fileSize}`)
        .header('Content-Length', chunkSize)
        .type(file.contentType);

    const stream = fs.createReadStream(file.location, { start, end });
    if(fileMeta.throttle) {
        const throttled = stream.pipe(speedLimit(1024 * fileMeta.throttle));
        return rep.send(throttled);
    }
    return rep.send(stream);
}
