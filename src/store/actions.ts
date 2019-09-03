import { ActionTree, ActionContext } from 'vuex'
import { RootState, File } from './types'
import path from 'path'
import fs from 'fs'

/**
 *
 */
const readDirectory = (filePath: string): Promise<fs.Dirent[]> => {
  return new Promise((resolve, reject) => {
    fs.readdir(filePath, { withFileTypes: true }, (error: NodeJS.ErrnoException | null, dirents: fs.Dirent[]) => {
      if (error) {
        reject(error)
      } else {
        resolve(dirents)
      }
    })
  })
}

/**
 *
 */
const readFileAsync = async (filePath: string, onFileRead: (filePath: File) => any): Promise<void> => {
  try {
    const dirents: fs.Dirent[] = await readDirectory(filePath)
    const directoryPaths: string[] = []
    for (const dirent of dirents) {
      const direntPath: string = path.join(filePath, dirent.name)
      const isDirectory: boolean = dirent.isDirectory()
      if (isDirectory) { directoryPaths.push(direntPath) }
      onFileRead({ isFile: !isDirectory, isDirectory, path: direntPath })
    }
    if (directoryPaths.length) {
      await Promise.all(
        directoryPaths.map((directoryPath: string): Promise<void> => readFileAsync(directoryPath, onFileRead)))
    }
  } catch (error) {
    // console.log(filePath, 'is a file A')
    onFileRead({ isFile: true, isDirectory: false, path: filePath })
  }
}

/**
 *
 */
const addFiles = async (context: ActionContext<RootState, RootState>, filePaths: string[]): Promise<void> => {
  console.time('total read time')
  const files: File[] = []
  await Promise.all(
    filePaths.map((filePath: string): Promise<void> => readFileAsync(filePath, (file: File) => {
      files.push(file)
    })))
  context.commit('addFile', files)
  console.timeEnd('total read time')
}

/**
 *
 */
const changeFileNames = async (context: ActionContext<RootState, RootState>): Promise<void> => {
  for (let i: number = 0, len: number = context.state.files.length; i < len; i++) {
    const file: File = context.state.files[i]
    const directoryPath: string = path.dirname(file.path)
    const extension: string = path.extname(file.path)
    const fileName: string = path.basename(file.path, extension)
    const newPath: string = `${directoryPath}/${fileName}-copy${extension}`
    fs.rename(file.path, newPath, (error) => {
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
