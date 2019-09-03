<template lang="pug">
  .action-pane
    h2 ActionPane
    file-selector
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { File } from '@/store/types'
import FileSelector from '@/components/file-selector/FileSelector.vue'

@Component({ components: {
  FileSelector,
}})
export default class ActionPane extends Vue {

}
</script>

<style scoped lang="scss">
.action-action-pane {
  color: red;
}
</style>