<template lang="pug">
  .data-table
    h2 Data table
    ul
      li(
        v-for="(item, index) in data" 
        :key="index"
      ) {{item}}
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export default class DataTable extends Vue {
  @Prop({ required: true, default: () => []}) protected data!: string[]
}
</script>

<style scoped lang="scss">
.data-table {
  color: green;
}
</style>