<template lang="pug">
  div
    h3 F002
</template>

<script lang="ts">
import { Component, Prop, Vue, Mixins } from 'vue-property-decorator'
import ActionMixin from '@/components/actions/ActionMixin.vue'

@Component
export default class F002 extends Mixins(ActionMixin) {

}
</script>

<style scoped lang="scss">
</style>