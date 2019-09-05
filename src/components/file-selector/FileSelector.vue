<template lang="pug">
  .file-selector
    h3 FileSelector
    button(
        @click.prevent="onOpenButtonClick"
      ) ファイルを追加
    drop-box
      p Drag &amp; drop your files or folders.
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { remote } from 'electron'
import DropBox from '@/components/drop-box/DropBox.vue'
import { getModule } from 'vuex-module-decorators'
import Files from '@/store/modules/files'

const app: Electron.App = remote.app
const dialog: Electron.Dialog = remote.dialog

@Component({
  components: {
    DropBox,
  },
})
export default class FileSelector extends Vue {

  private async onOpenButtonClick(event: MouseEvent): Promise<void> {
    const result: Electron.OpenDialogReturnValue = await dialog.showOpenDialog({
      properties: ['openFile', 'openDirectory', 'multiSelections'],
    })
    if (result.filePaths && result.filePaths.length) {
      // this.$store.dispatch('addFiles', result.filePaths)
      Files.addFilesAsync(result.filePaths)
    }
  }

}
</script>

<style scoped lang="scss">
.file-selector {
  background-color: lightcoral;
}
</style>
