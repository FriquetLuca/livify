import fs from "fs";
import { tryGet } from "../../functional";
  
export function loadMetadata<T>(path: string, defaultValue: T) {
    return tryGet<T>(() => JSON.parse(fs.readFileSync(`${path}.livify`, { encoding: "utf-8" })), defaultValue)
}
