import path from "path";
import fs from "fs";
import { CONTENT_TYPE, ContentType } from "../../http";

export interface LocationStats {
    lastAccess: number;
    modifiedAt: number;
    lastStatusChanged: number;
    createdAt: number;
}

export interface LocationItem<T extends ContentType> {
    name: string;
    path: string;
    relativePath: string;
    contentType: T;
    isRoot: boolean;
    stats: LocationStats;
    hasMeta: boolean;
}

export interface LocationFile extends LocationItem<ContentType> {
    type: "file";
    extension: string;
}

export interface LocationDirectory extends LocationItem<"text/html"> {
    type: "directory";
    hasIndex: boolean;
    content: LocationElement[];
}

export type LocationElement = LocationFile|LocationDirectory;

const backslashRegexp = new RegExp("\\\\", "g");

export type LocationTreeOptions = {
    isRoot?: boolean,
    prefix?: string,
    currentDepth?: number,
    maxDepth?: number,
};

export function cleanSlashesURL(url: string) {
  let i = 0;
  while(i < url.length) {
    if(url[i] !== "/") {
      break;
    }
    i++;
  }
  const unslashURL = url.slice(i, url.length);
  return `/${unslashURL.split("/").map(u => encodeURIComponent(u)).join("/")}`;
}

export function locationTree(location: string, opts: LocationTreeOptions = { }): LocationElement|undefined {
    const options = {
      isRoot: true,
      ...opts
    };
    const pathStats = fs.statSync(location);
    if(pathStats.isDirectory()) {
      const dirContentLocations = fs.readdirSync(location);
      const dirName = path.basename(location);
      const pref = options.isRoot ? (options.prefix === undefined ? "/" : options.prefix) : path.join(options.prefix??"/", dirName);
      let hasIndexHtml = false;
      let hasIndexMd = false;
      let content: LocationElement[] = [];
      for(const dirContentLocation of dirContentLocations) {
        if(dirContentLocation === "index.html") {
          hasIndexHtml = true;
        } else if(dirContentLocation === "index.md") {
          hasIndexMd = true;
        }
        if(options.maxDepth) {
            if(options.currentDepth??0 > options.maxDepth) {
                continue;
            }
        }
        const loc = locationTree(path.join(location, dirContentLocation), {
            ...options,
            prefix: pref,
            currentDepth: (options.currentDepth??0) + 1,
            isRoot: false,
        });
        if(loc) {
          content.push(loc);
        }
      }
      const metaPath = `${location}.livify`;
      const hasMeta = fs.existsSync(metaPath);
      return {
        type: "directory",
        contentType: "text/html",
        isRoot: options.isRoot,
        path: location,
        relativePath: pref.replace(backslashRegexp, "/"),
        name: dirName,
        hasIndex: hasIndexHtml || hasIndexMd,
        content,
        stats: {
          lastAccess: pathStats.atimeMs,
          modifiedAt: pathStats.mtimeMs,
          lastStatusChanged: pathStats.ctimeMs,
          createdAt: pathStats.birthtimeMs,
        },
        hasMeta,
      };
    } else if(pathStats.isFile()) {
      const extension = path.extname(location);
      const fileName = path.basename(location);
      const name = fileName.substring(0, fileName.length - extension.length);
      const isMeta = extension === ".livify";
      if(isMeta) {
        return undefined;
      }
      const metaPath = path.join(path.dirname(location), `${name}${extension}.livify`);
      const hasMeta = fs.existsSync(metaPath);
      return {
        type: "file",
        contentType: CONTENT_TYPE[extension as keyof typeof CONTENT_TYPE] ?? "text/text",
        isRoot: options.isRoot,
        path: location,
        relativePath: path.join(options.prefix ?? "", fileName).replace(backslashRegexp, "/"),
        name,
        extension,
        stats: {
          lastAccess: pathStats.atimeMs,
          modifiedAt: pathStats.mtimeMs,
          lastStatusChanged: pathStats.ctimeMs,
          createdAt: pathStats.birthtimeMs,
        },
        hasMeta,
      };
    }
    return undefined;
}
