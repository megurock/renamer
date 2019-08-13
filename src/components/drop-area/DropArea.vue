<template lang="pug">
  .drop-area(
    @dragover.prevent.stop=""
    @drop.prevent.stop="onDrop"
  )
    p Drop!
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';


@Component
export default class DropArea extends Vue {

  protected onDrop(event: DragEvent): void {
    const fileList: FileList = event.dataTransfer!.files;
    const files: File[] = [];
    for (let i: number = 0, len: number = fileList.length; i < len; i++) {
      const file: File | null = fileList.item(i);
      if (file !== null) {
        files.push(file);
      }
    }
    this.$store.commit('setFiles', files);
  }

}
</script>


<style scoped lang="scss">
.drop-area {
  width: 80%;
  height: 500px;
  border: 5px solid #333;
}
</style>
