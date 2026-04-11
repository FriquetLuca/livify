import type { FastifyRequest } from "fastify";

export function acceptRanges(req: FastifyRequest, fileSize: number): [start: number, end: number] | undefined {
    const range = req.headers.range;
    if (!range) {
        return undefined;
    }
    const parts = range.replace(/bytes=/, "").split("-");
    const start = parseInt(parts[0], 10);
    const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;
    return [start, end];
}
