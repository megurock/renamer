import { ActionTree, ActionContext } from 'vuex'
import { RootState } from './types'
import path from 'path'
import fs from 'fs'

/**
 * retrieve all file paths in a file (directory)
 */
const traverseFile = (entryFilePath: string, onFileRead: (path: string) => any) => {
  fs.readdir(entryFilePath, { withFileTypes: true }, (error: NodeJS.ErrnoException | null, dirents: fs.Dirent[]) => {
    onFileRead(entryFilePath)
    if (!error) {
      for (const dirent of dirents) {
        const direntPath: string = path.join(entryFilePath, dirent.name)
        onFileRead(direntPath)
        if (dirent.isDirectory()) {
          traverseFile(direntPath, onFileRead)
        }
      }
    }
  })
}

/**
 *
 */
const addFiles = async (context: ActionContext<RootState, RootState>, filePaths: string[]): Promise<void> => {
  for (let i: number = 0, len: number = filePaths.length; i < len; i++) {
    const filePath: string = filePaths[i]
    traverseFile(filePath, (fp: string) => {
      context.commit('addFilePath', fp)
    })
  }
}

/**
 *
 */
const changeFileNames = async (context: ActionContext<RootState, RootState>): Promise<void> => {
  for (let i: number = 0, len: number = context.state.filePaths.length; i < len; i++) {
    const filePath: string = context.state.filePaths[i]
    const directoryPath: string = path.dirname(filePath)
    const extension: string = path.extname(filePath)
    const fileName: string = path.basename(filePath, extension)
    const newPath: string = `${directoryPath}/${fileName}-copy${extension}`
    fs.rename(filePath, newPath, (error) => {
      if (error) {
        console.error(error)
      }
    })
  }
}

//
export const actions: ActionTree<RootState, RootState> = {
  addFiles,
  changeFileNames,
}

export default actions
