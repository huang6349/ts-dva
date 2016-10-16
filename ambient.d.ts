interface FileRequireFunction {
  (path: string): any;
  (paths: string[], callback: (...modules: any[]) => void): void;
}

interface FileRequire extends FileRequireFunction {
  resolve(path: string): string;
  ensure: (paths: string[], callback: (require: (path: string) => any) => void) => void;
}

declare var require: FileRequire;