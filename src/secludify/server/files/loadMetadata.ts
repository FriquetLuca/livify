import fs from "fs";
import { tryGet } from "../../functional";

export type LocationMetaFileAttachment = Partial<{
    disposition: "attachment"|"inline",
    filename: string,
}>;

export type LocationFileMeta = Partial<{
    title: string,
    file: LocationMetaFileAttachment,
    hidden: boolean,
    throttle: number,
    reqLimit: number,
    reqWindowLimit: number,
}>;

export type LocationDirectoryMeta = Partial<{
    title: string,
    indexed: boolean,
    hidden: boolean,
    unlinkIndex: boolean,
}>;
  
export function loadMetadata<T extends LocationFileMeta | LocationDirectoryMeta>(path: string, defaultValue: T) {
    return tryGet<T>(() => JSON.parse(fs.readFileSync(`${path}.livify`, { encoding: "utf-8" })), defaultValue);
}
