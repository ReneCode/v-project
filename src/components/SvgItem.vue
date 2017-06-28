
<template>
  <svg-text-item ref="svgitem" v-if="item.type==='text'" :item="item"></svg-text-item>
  <g v-else></g>
</template>

<script>
import SvgTextItem from './SvgTextItem';

export default {
  name: 'svg-item',
  props: ['item'],

  components: {
    SvgTextItem
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>

</style>
