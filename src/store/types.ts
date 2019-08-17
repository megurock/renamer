export interface RootState {
  version: string;
  entries: Entry[];
}

/**
 * @url https://dev.w3.org/2009/dap/file-system/file-dir-sys.html#the-entry-interface
 */
export interface Entry {
  readonly isFile: boolean;
  readonly isDirectory: boolean;
  readonly name: string;
  readonly fullPath: string;
}
