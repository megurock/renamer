<template lang="pug">
  .file-list
    h2 FileList
    table.file-data-table
      thead
        tr
          th checked
          th name
          th directory
      tbody
        tr(
            v-for="(file, index) in files" 
            :key="index"
          ) 
          td: input(type="checkbox")
          td {{file.path}} 
          td {{file.isDirectory}}
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { File } from '@/store/modules/files/types'

@Component
export default class FileList extends Vue {
  @Prop({ required: true, default: () => []}) protected files!: File[]
}
</script>

<style scoped lang="scss">
.file-data-table {
  width: 100%;
  background: #fff;
  border-collapse: collapse;
  thead {
    th {
      font-weight: normal;
    }
  }
  tbody {
    tr:nth-child(odd) {
      background-color: #efefef;
    }
  }
}
</style>