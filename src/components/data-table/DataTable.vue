<template lang="pug">
  .data-table
    h2 Data table
    ul
      li(
        v-for="(file, index) in files" 
        :key="index"
      ) {{file.path}}
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { File } from '@/store/types'

@Component
export default class DataTable extends Vue {
  @Prop({ required: true, default: () => []}) protected files!: File[]
}
</script>

<style scoped lang="scss">
.data-table {
  color: green;
}
</style>