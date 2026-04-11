import type { FastifyReply, FastifyRequest } from "fastify";
import { type FileData } from ".";
import { acceptRanges } from "./acceptRanges";
import fs from "fs";
import { type LocationFileMeta } from "./loadMetadata";

export function sendFile(file: FileData, fileMeta: LocationFileMeta, fileSize: number, req: FastifyRequest, rep: FastifyReply) {

    if(fileMeta?.hidden === true) {
        return rep.code(404).send({ message: `Route GET:${req.originalUrl} not found`, error: "Not Found" });
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

    const range = acceptRanges(req, fileSize);

    rep.header('Accept-Ranges', 'bytes');

    if (!range) {
        rep.header('Content-Length', fileSize);
        return rep
            .code(200)
            .type(file.contentType)
            .send(fs.createReadStream(file.location));
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

    return rep.send(stream);
}
