import { type ContentType } from '../../http';

export interface FileData {
    contentType: ContentType;
    location: string;
    route: string;
    skip?: boolean;
    disposition?: "attachment"|"inline";
    filename?: string;
}

export { type DynamicFileOption, dynamicFiles } from './dynamicFiles';
export { loadMetadata, type LocationMetaFileAttachment, type LocationFileMeta, type LocationDirectoryMeta } from "./loadMetadata";
export { type StaticFileOption, staticFiles, createStaticFileRoute } from './staticFiles';
export * from "./locationTree";
export { isRateLimited } from "./isRateLimited";
export { sendFile } from "./sendFile";
export { speedLimit } from "./speedLimit";
export { acceptRanges } from "./acceptRanges";
