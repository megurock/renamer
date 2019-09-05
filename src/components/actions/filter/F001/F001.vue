<template lang="pug">
  .action-card
    h3.action-card__heading F001
    ul
      li(v-for="(fileFilter, index) in fileFilters" :key="index")
        label
          input(
            type="radio" 
            name="type" 
            :value="fileFilter.value" 
            :checked="fileFilter === selectedFileFilter"
            @change="onFileFilterChange(fileFilter)"
          )
          span {{fileFilter.text}}
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch, Mixins } from 'vue-property-decorator'
import ActionMixin from '@/components/actions/ActionMixin.vue'
import Files from '@/store/modules/files'
import { File, Filter, FilterItem } from '@/store/modules/files/types'

interface FileFilter {
  text: string
  value: string,
  filter: Filter
}

@Component
export default class F001 extends Mixins(ActionMixin) {

  private fileFilters: FileFilter[] = [
    { text: 'ファイル', value: 'file', filter(file: File) { return file.isFile } },
    { text: 'フォルダ', value: 'folder', filter(file: File) { return file.isDirectory } },
    { text: '両方', value: 'both', filter(file: File) { return true } },
  ]
  private selectedFileFilter: FileFilter = this.fileFilters[0]

  /**
   *
   */
  private onFileFilterChange(fileFilter: FileFilter): void {
    this.selectedFileFilter = fileFilter
    const filterItem: FilterItem = {
      id: 'f001',
      filter: fileFilter.filter,
    }
    //
    Files.removeFilter(filterItem.id)
    if (this.selectedFileFilter.value !== 'both') {
      Files.addFilter(filterItem)
    }
  }

  /**
   *
   */
  private mounted() {
    this.onFileFilterChange(this.selectedFileFilter)
  }

}
</script>