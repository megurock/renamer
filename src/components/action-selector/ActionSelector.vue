<template lang="pug">
  .action-selector
    h2 ActionSelector
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { File } from '@/store/types'

@Component
export default class ActionSelector extends Vue {

}
</script>

<style scoped lang="scss">
.action-selector {
  color: red;
}
</style>