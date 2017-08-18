
<template>
  <svg-text-item ref="svgitem" v-if="item.type==='text'" :selected="selected" :item="item"></svg-text-item>
  <svg-rect-item ref="svgitem" v-else-if="item.type==='rect'" :selected="selected" :item="item"></svg-rect-item>
  <g v-else></g>
</template>

<script>
import SvgTextItem from './SvgTextItem';
import SvgRectItem from './SvgRectItem';

export default {
  name: 'svg-item',
  props: ['item', 'selected'],

  components: {
    SvgTextItem,
    SvgRectItem
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>

</style>
