<template lang="pug">
  .drop-area(
    @dragover.prevent.stop=""
    @drop.prevent.stop="onDrop"
  )
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export default class DropArea extends Vue {

  /**
   *
   */
  protected onDrop(event: DragEvent): void {
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
.drop-area {
  width: 100%;
  height: 200px;
  border: 5px solid #333;
}
</style>
