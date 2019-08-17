<template lang="pug">
  header.app-header
    div
      button(
        :disabled="!entries.length"
        @click.prevent="$emit('excute')"
      ) 開始
    .file-uploader フォルダを選択
      input.file-uploader__input(type="file" webkitdirectory @change="onFileUpload")
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { State } from 'vuex-class';
import { Entry } from '../../store/types';

@Component
export default class AppHeader extends Vue {
  @State('entries') private readonly entries!: Entry[];

  /**
   *
   */
  private onFileUpload(event: Event): void {
    console.log('e', (event.target as any).files);
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