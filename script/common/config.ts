import path from "path";

export const LOCAL_PORT = "9999";

export enum Directory {
  SOURCE = "src",
  OUTPUT = "dist",
  STATIC = "static",
}

export function pathFromSource(localPath: string) {
  return path.resolve(Directory.SOURCE, localPath);
}
