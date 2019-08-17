import { MutationTree } from 'vuex';
import { RootState, Entry } from './types';

const mutations: MutationTree<RootState> = {
  setEntries(state: RootState, payload: Entry[]): void {
    state.entries = payload;
  },
  changeFileNames(state: RootState): void {
    // empty
  },
};

export default mutations;
