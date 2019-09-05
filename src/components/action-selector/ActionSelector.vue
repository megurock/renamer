<template lang="pug">
  .action-selector
    dl#action-category-list.action-list
      dt category
      dd(
        v-for="(type, index) in actionTypeList" 
        :key="index"
        @click="setActionType(type)"
      ) {{type}}
    dl#action-list.action-list
      dt action
      dd(
        v-for="(action, index) in filteredActionList" 
        :key="index"
        @click="setAction(action)"
        @dblclick="addAction(action)"
      ) {{action.name}}
    #action-descriptor.action-descriptor
      dl(v-if="selectedAction")
        dt {{selectedAction.name}}
        dd {{selectedAction.description}}
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
  private get selectedAction(): Action | undefined { return Actions.selectedAction }

  /**
   *
   */
  private setActionType(type: ActionType): void {
    Actions.setActionType(type)
  }

  /**
   *
   */
  private setAction(action: Action): void {
    Actions.setAction(action)
  }

  /**
   *
   */
  private addAction(action: Action): void {
    Actions.addAction(action)
  }

}
</script>

<style scoped lang="scss">
.action-selector {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: min-content 1fr; 
  grid-template-areas: 
    "action-category-list action-list"
    "action-descriptor    action-descriptor"
}
#action-category-list { grid-area: action-category-list; }
#action-list { grid-area: action-list; }
#action-descriptor { grid-area: action-descriptor; }

.action-list {
  list-style-type: none;
  dt {
    text-align: center;
  }
  dd {
    margin: 0;
  }
}

.action-descriptor {
  dd {
    margin: 0;
  }
}


</style>