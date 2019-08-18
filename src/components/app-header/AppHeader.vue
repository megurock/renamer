<template lang="pug">
  header.app-header
    div
      button(
        :disabled="!filePaths.length"
        @click.prevent="$emit('execute')"
      ) 開始
      button(
        @click.prevent="onOpenButtonClick"
      ) 開く
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { State } from 'vuex-class'
import { remote } from 'electron'

const app: Electron.App = remote.app
const dialog: Electron.Dialog = remote.dialog

@Component
export default class AppHeader extends Vue {
  @State('filePaths') private readonly filePaths!: string[]

  private async onOpenButtonClick(event: MouseEvent): Promise<void> {
    const result: Electron.OpenDialogReturnValue = await dialog.showOpenDialog({
      properties: ['openFile', 'openDirectory', 'multiSelections'],
    })
    if (result.filePaths && result.filePaths.length) {
      this.$store.dispatch('addFiles', result.filePaths)
    }
  }
}
</script>

<style scoped lang="scss">
.app-header {
  color: green;
}

.file-uploader {
  position: relative;
  display: inline-block;
  overflow: hidden;
  border: 1px solid black;

  &__input {
    cursor: pointer;
    display: block;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    line-height: 1;
    opacity: 0;
  }
}
</style>