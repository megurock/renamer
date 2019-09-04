import { Module, VuexModule, Mutation, Action, getModule } from 'vuex-module-decorators'
import store from '@/store'
import { File } from './types'
import retrieveFilePathAsync from './retrieveFilePathAsync'

@Module({ dynamic: true, store, name: 'files', namespaced: true })
class Files extends VuexModule {

  private _list: File[] = []
  public get list(): File[] { return this._list }

  @Action({ rawError: true })
  public async addFiles(filePaths: string[]): Promise<void> {
    console.time('total read time')
    const files: File[] = []
    await Promise.all(filePaths.map((filePath: string): Promise<void> =>
      retrieveFilePathAsync(filePath, (file: File) => {
        files.push(file)
      }),
    ))
    this.addFile(files)
    console.timeEnd('total read time')
  }

  @Mutation
  private addFile(files: File | File[]): void {
    this._list.push(...Array.isArray(files) ? files : [files])
  }

}

export default getModule(Files)
