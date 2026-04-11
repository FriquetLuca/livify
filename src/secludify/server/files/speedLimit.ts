import { Transform } from "stream";

export function speedLimit(bytesPerSecond: number) {
    let bytes = 0;
    let start = Date.now();

    return new Transform({
        transform(chunk, _, callback) {
            bytes += chunk.length;

            const elapsed = (Date.now() - start) / 1000;
            const expected = bytes / bytesPerSecond;

            const delay = expected - elapsed;

            if (delay > 0) {
                setTimeout(() => callback(null, chunk), delay * 1000);
            } else {
                callback(null, chunk);
            }
        }
    });
}
