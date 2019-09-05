<template lang="pug">
  .action-pane
    h2 ActionPane
    file-selector
    component(
      v-for="(action, index) in selectedActionList"
      :key="index" 
      :is="action.id"
    ) 
</template>

<script lang="ts">
import { Component, Prop, Vue, Mixins } from 'vue-property-decorator'
import FileSelector from '@/components/file-selector/FileSelector.vue'
import Actions from '@/store/modules/actions/'
import { Action, ActionType } from '@/store/modules/actions/types'


@Component({ components: {
  FileSelector,
}})
export default class ActionPane extends Vue {
  private get selectedActionList(): Action[] { return Actions.selectedActionList }
}
</script>

<style scoped lang="scss">
.action-action-pane {
  color: red;
}
</style>