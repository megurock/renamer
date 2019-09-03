<template lang="pug">
  header.app-header
    div
      h2 AppHeader
      button(
        :disabled="!files.length"
        @click.prevent="$emit('execute')"
      ) 開始
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { State } from 'vuex-class'

@Component
export default class AppHeader extends Vue {
  @State('files') private readonly files!: string[]


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