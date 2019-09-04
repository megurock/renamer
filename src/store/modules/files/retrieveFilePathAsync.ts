import path from 'path'
import fs from 'fs'
import { File } from './types'

/**
 *
 */
const readDirectory = async (filePath: string): Promise<fs.Dirent[]> => {
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
const retrieveFilePathAsync = async (filePath: string, onFileRead: (filePath: File) => any): Promise<void> => {
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
        directoryPaths.map((directoryPath: string): Promise<void> => retrieveFilePathAsync(directoryPath, onFileRead)))
    }
  } catch (error) {
    onFileRead({ isFile: true, isDirectory: false, path: filePath })
  }
}

export default retrieveFilePathAsync

