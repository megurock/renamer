<template lang="pug">
  .drop-box(
      @dragover.prevent.stop=""
      @drop.prevent.stop="onDrop"
    )
    slot
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { remote } from 'electron'

const app: Electron.App = remote.app
const dialog: Electron.Dialog = remote.dialog

@Component
export default class DropBox extends Vue {

  /**
   *
   */
  protected onDrop(event: DragEvent): void {
    console.log('onDrop')
    if (event.dataTransfer) {
      const filePaths: string[] = []
      for (let i: number = 0, len: number = event.dataTransfer.files.length; i < len; i++) {
        const file: File = event.dataTransfer.files[i]
        filePaths[i] = file.path
      }
      this.$store.dispatch('addFiles', filePaths)
    }
  }

}
</script>

<style scoped lang="scss">
.drop-box {
  width: 100%;
  height: 200px;
  border: 5px solid #333;
  box-sizing: border-box;
  background-color: #fff;
}
</style>
