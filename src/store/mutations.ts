import { MutationTree } from 'vuex'
import { RootState } from './types'

const mutations: MutationTree<RootState> = {
  addFilePath(state: RootState, payload: string): void {
    state.filePaths.push(payload)
  },
  changeFileNames(state: RootState): void {
    // empty
  },
}

export default mutations
