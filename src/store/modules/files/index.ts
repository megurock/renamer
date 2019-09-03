import { Module, VuexModule, Mutation, Action, getModule } from 'vuex-module-decorators'
import store from '@/store'
import path from 'path'
import fs from 'fs'
import { File } from './types'

/**
 *
 */
const  readDirectory = async (filePath: string): Promise<fs.Dirent[]> => {
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


@Module({ dynamic: true, store, name: 'files' })
class Files extends VuexModule {

  private list: File[] = []

  @Action({ rawError: true })
  public async addFiles(filePaths: string[]): Promise<void> {
    console.time('total read time')
    const files: File[] = []
    await Promise.all(filePaths.map((filePath: string): Promise<void> =>
      readFileAsync(filePath, (file: File) => {
        files.push(file)
      }),
    ))
    this.addFile(files)
    console.timeEnd('total read time')
  }

  @Mutation
  private addFile(files: File | File[]): void {
    this.list.push(...Array.isArray(files) ? files : [files])
  }

}

export default getModule(Files)
