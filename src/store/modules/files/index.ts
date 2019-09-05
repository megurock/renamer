import { Module, VuexModule, Mutation, Action, getModule } from 'vuex-module-decorators'
import store from '@/store'
import { File } from './types'
import retrieveFilePathAsync from './retrieveFilePathAsync'

@Module({ dynamic: true, store, name: 'files', namespaced: true })
class Files extends VuexModule {

  private _list: File[] = []
  public get list(): File[] { return this._list }

  @Action({ rawError: true })
  public async addFilesAsync(filePaths: string[]): Promise<void> {
    console.time('total read time')
    const files: File[] = []
    await Promise.all(filePaths.map((filePath: string): Promise<void> =>
      retrieveFilePathAsync(filePath, (file: File) => {
        files.push(file)
      }),
    ))
    console.log('total number of files', files.length)
    this.addFiles(files)
    console.timeEnd('total read time')
  }

  @Mutation
  private addFiles(files: File[]): void {
    // this may cause a range error (Maximu call stack size exceeded.)
    // try {
    //   this._list.push(...files)
    // } catch (error) {
    //   console.warn('error!', error)
    // }
    files.forEach((file: File) => {
      try {
        this._list.push(file)
      } catch (error) {
        console.warn(error)
      }
    })
  }

}

export default getModule(Files)
