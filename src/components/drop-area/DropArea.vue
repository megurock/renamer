<template lang="pug">
  .drop-area(
    @dragover.prevent.stop=""
    @drop.prevent.stop="onDrop"
  )
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { Entry } from '../../store/types';

@Component
export default class DropArea extends Vue {

  protected onDrop(event: DragEvent): void {
    const items: DataTransferItemList = event.dataTransfer!.items;
    const entries: Entry[] = [];
    for (let i: number = 0, len: number = items.length; i < len; i++) {
      const item: DataTransferItem | null = items[i];
      const entry: Entry | null = this.getEntry(item);
      if (entry) {
        entries.push(entry);
      }
    }
    console.table(entries);
    this.$store.commit('setEntries', entries);
  }

  /**
   *
   */
  protected getEntry(item: DataTransferItem | null): Entry | null {
    const theItem: any = item;
    let entry: Entry | null = null;
    if (theItem.getAsEntry) {
      entry = theItem.getAsEntry();
    // Webkit実装
    } else if (theItem.webkitGetAsEntry) {
      entry = theItem.webkitGetAsEntry();
    }
    return entry;
  }

}
</script>

<style scoped lang="scss">
.drop-area {
  width: 100%;
  height: 200px;
  border: 5px solid #333;
}
</style>
