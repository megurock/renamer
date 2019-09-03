export interface RootState {
  version: string
  files: File[]
}

export interface File {
  isFile: boolean
  isDirectory: boolean
  path: string
}
