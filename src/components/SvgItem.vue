
<template>
  <svg-text-item ref="svgitem" v-if="item.type==='text'" :item="item"></svg-text-item>
  <svg-rect-item ref="svgitem" v-else-if="item.type==='rect'" :item="item"></svg-rect-item>
  <g v-else></g>
</template>

<script>
import SvgTextItem from './SvgTextItem';
import SvgRectItem from './SvgRectItem';

export default {
  name: 'svg-item',
  props: ['item'],

  components: {
    SvgTextItem,
    SvgRectItem
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>

</style>
