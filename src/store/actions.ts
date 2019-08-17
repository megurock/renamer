import { ActionTree, ActionContext } from 'vuex';
import { RootState, Entry } from './types';
// import * as fs from 'fs'
import path from 'path';
import * as fs from 'fs-extra';

export const actions: ActionTree<RootState, RootState> = {
  async changeFileNames(context: ActionContext<RootState, RootState>): Promise<any> {
    return new Promise(async (resolve, reject) => {
      console.log('changeFileNames');
      const totalCount: number = context.state.entries.length;
      const countDone: number = 0;
      for (let i: number = 0; i < totalCount; i++) {
        const entry: Entry = context.state.entries[i];
        console.log('en?', entry.fullPath);
        const directory: string = path.dirname(entry.fullPath);
        const extension: string = path.extname(entry.fullPath);
        const fileName: string = path.basename(entry.fullPath, extension);

        console.log(directory, fileName, extension);
        const newPath: string = `${directory}${fileName}_renamed${extension}`;
        fs.renameSync(entry.fullPath, newPath);
        console.log('done');
        // fs.copy(entry.fullPath, `${entry.fullPath}`)
      }
      resolve('ok');
    });
  },
};

export default actions;
