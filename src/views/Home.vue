<template lang="pug">
  .home
    app-header(
      @fileUpload="onFileUpload"
      @execute="onExcuteButonClick"
    )
    action-selector
    action-pane
    file-list(:files="list")
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import ActionPane from '@/components/action-pane/ActionPane.vue'
import ActionSelector from '@/components/action-selector/ActionSelector.vue'
import AppHeader from '@/components/app-header/AppHeader.vue'
import FileList from '@/components/flile-list/FileList.vue'
import { File } from '@/store/modules/files/types'
import { RootState } from '../store/types'
import Files from '@/store/modules/files'

@Component({
  components: {
    ActionPane,
    ActionSelector,
    AppHeader,
    FileList,
  },
})
export default class Home extends Vue {

  private get list(): File[] { return Files.list }

  /**
   *
   */
  private onExcuteButonClick(): void {
    this.$store.dispatch('changeFileNames')
  }

  /**
   *
   */
  private onFileUpload(event: Event): void {
    console.log('e', event)
  }

}
</script>

<style lang="scss">
.home { 
  display: grid; 
  grid-template-columns: auto 1fr;
  grid-template-rows: max-content max-content 1fr;
  grid-template-areas: 
    "header header"
    "action-selector action-pane"
    "file-list file-list" 
}

.app-header {
  grid-area: header;
  background-color: lightblue;
}

.action-selector {
  grid-area: action-selector;
  background-color: lightyellow;
}

.action-pane {
  grid-area: action-pane;
  background-color: lightgreen;
}

.file-list {
  grid-area: file-list;
  background: lightpink;
}
</style>
