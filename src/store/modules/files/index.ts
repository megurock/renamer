import { Module, VuexModule, Mutation, Action, getModule } from 'vuex-module-decorators'
import store from '@/store'
import { File, FilterItem } from './types'
import retrieveFilePathAsync from './retrieveFilePathAsync'

@Module({ dynamic: true, store, name: 'files', namespaced: true })
class Files extends VuexModule {

  /**
   *
   */
  public get list(): File[] {
    let list: File[] = this._list
    this.filters.forEach((item: FilterItem) => {
      list = list.filter(item.filter)
    })
    return list
  }

  private _list: File[] = []
  private filters: FilterItem[] = []

  /**
   *
   */
  @Action
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

  /**
   *
   */
  @Action
  public addFilter(item: FilterItem): void {
    this.removeFilter(item.id)
    this.filters.push(item)
  }

  /**
   *
   */
  @Mutation
  public removeFilter(itemId: string): void {
    for (let i: number = 0, len = this.filters.length; i < len; i++) {
      if (this.filters[i].id === itemId) {
        this.filters.splice(i, 1)
        break
      }
    }
  }

  /**
   *
   */
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
