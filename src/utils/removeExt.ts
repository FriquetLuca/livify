import path from "path";

export function removeExt(input: string) {
  const extname = path.extname(input);
  return input.substring(0, input.length - extname.length);
}
