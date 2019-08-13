import { MutationTree } from 'vuex';
import { RootState } from './types';

const mutations: MutationTree<RootState> = {
  setFiles(state: RootState, payload: File[]): void {
    state.files = payload;
  },
};

export default mutations;
