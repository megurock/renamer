<template lang="pug">
  .action-selector
    dl.action-list
      dt category
      dd(
        v-for="(type, index) in actionTypeList" 
        :key="index"
        @click="changeActionType(type)"
      ) {{type}}
    dl.action-list
      dt action
      dd(
        v-for="(action, index) in filteredActionList" 
        :key="index"
        @dblclick="addAction(action)"
      ) {{action.name}}
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { File } from '@/store/modules/files/types'
import Actions from '@/store/modules/actions/'
import { Action, ActionType } from '@/store/modules/actions/types'
import { log } from 'util'

@Component
export default class ActionSelector extends Vue {

  private get actionTypeList(): string[] { return Actions.actionTypeList }
  private get filteredActionList(): Action[] { return Actions.filteredActionList }

  private changeActionType(type: ActionType): void {
    Actions.setActionType(type)
  }

  private addAction(action: Action): void {
    Actions.addAction(action)
  }

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