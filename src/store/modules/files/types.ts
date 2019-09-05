export interface File {
  isFile: boolean
  isDirectory: boolean
  path: string
}

export type Filter = (file: File) => boolean

export interface FilterItem {
  id: string
  filter: Filter
}
