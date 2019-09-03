<template lang="pug">
  .action-selector
    dl.action-list
      dt category
      dd フィルタ
      dd リネーム
      dd 属性変更
    dl.action-list
      dt action
      dd 連番付きファイル名に変更
      dd ファイル名に連番を追加
      dd 拡張子の追加・置換
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { File } from '@/store/modules/files/types'

@Component
export default class ActionSelector extends Vue {

}
</script>

<style scoped lang="scss">
.action-selector {
  display: grid;
  grid-template-columns: 1fr 1fr;
}

.action-list {
  list-style-type: none;
  dt {
    text-align: center;
  }
  dd {
    margin: 0;
  }
}
</style>