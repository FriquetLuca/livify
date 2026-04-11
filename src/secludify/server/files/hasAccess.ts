import path from "path";
import { loadMetadata } from "./loadMetadata";

function getPathSegments(requestPath: string): string[] {
    return path.normalize(requestPath).split(path.sep).filter(Boolean);
}

export function hasAccess(
    defaultLocation: string,
    requestPath: string
): boolean {
    const absoluteRequest = path.resolve(requestPath);
    const absoluteBase = path.resolve(defaultLocation);
    if (!absoluteRequest.startsWith(absoluteBase)) {
        return false;
    }
    const relativePath = path.relative(absoluteBase, absoluteRequest);
    const segments = getPathSegments(relativePath);
    let currentPath = absoluteBase;
    for (const segment of segments) {
        currentPath = path.join(currentPath, segment);
        const meta = loadMetadata(currentPath, { hidden: false });
        if (meta.hidden) {
            return false;
        }
    }
    return true;
}
