<template lang="pug">
  .home
    DropArea
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import HelloWorld from '@/components/HelloWorld.vue';
import DropArea from '@/components/drop-area/DropArea.vue';

@Component({
  components: {
    DropArea,
  },
})
export default class Home extends Vue {}
</script>
