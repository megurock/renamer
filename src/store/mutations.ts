import { MutationTree } from 'vuex'
import { RootState, File } from './types'

const mutations: MutationTree<RootState> = {
  addFile(state: RootState, payload: File | File[]): void {
    const files: File[] = Array.isArray(payload) ? payload : [payload]
    state.files.push(...files)
  },
  changeFileNames(state: RootState): void {
    // empty
  },
}

export default mutations
