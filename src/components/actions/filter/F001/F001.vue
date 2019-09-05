<template lang="pug">
  div
    h3 F001
</template>

<script lang="ts">
import { Component, Prop, Vue, Mixins } from 'vue-property-decorator'
import ActionMixin from '@/components/actions/ActionMixin.vue'

@Component
export default class F001 extends Mixins(ActionMixin) {

}
</script>

<style scoped lang="scss">
</style>