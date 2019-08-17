<template lang="pug">
  .home
    app-header(
      @fileUpload="onFileUpload"
      @excute="onExcuteButonClick"
    )
    drop-area
    data-table(:data="entries")
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Action, State } from 'vuex-class';
import AppHeader from '@/components/app-header/AppHeader.vue';
import DataTable from '@/components/data-table/DataTable.vue';
import DropArea from '@/components/drop-area/DropArea.vue';
import { Entry } from '@/store/types';
import { actions } from '@/store/actions';

@Component({
  components: {
    AppHeader,
    DataTable,
    DropArea,
  },
})
export default class Home extends Vue {

  @State('entries') private readonly entries!: Entry[];

  /**
   *
   */
  private onExcuteButonClick(): void {
    this.$store.dispatch('changeFileNames');
  }

  /**
   *
   */
  private onFileUpload(event: Event): void {
    console.log('e', event);
  }

}
</script>
