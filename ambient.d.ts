interface FileRequire {
  (url: string): any,
}

declare var require: FileRequire;
