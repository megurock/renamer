<template lang="pug">
  .home
    app-header(
      @fileUpload="onFileUpload"
      @execute="onExcuteButonClick"
    )
    drop-area
    data-table(:files="files")
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { Action, State } from 'vuex-class'
import AppHeader from '@/components/app-header/AppHeader.vue'
import DataTable from '@/components/data-table/DataTable.vue'
import DropArea from '@/components/drop-area/DropArea.vue'
import { actions } from '@/store/actions'
import { File } from '@/store/types'

@Component({
  components: {
    AppHeader,
    DataTable,
    DropArea,
  },
})
export default class Home extends Vue {

  @State('files') private readonly files!: File[]

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
