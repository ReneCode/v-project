
<template>
  <g>
    <rect v-if="selected(item)" class="selection" :x="bbox().x" :y="bbox().y" :width="bbox().width" :height="bbox().height"></rect>
  
    <rect ref="item" :gid="item.id" :x="x" :y="y" :width="width" :height="height" :stroke="item.stroke" :fill="item.fill"></rect>
  </g>
</template>

<script>
import ItemHelper from '@/util/item-helper';

export default {
  name: 'svg-rect-item',
  props: ['item'],

  computed: {

    x() {
      let x = Math.min(this.item.x1, this.item.x2);
      let translation = ItemHelper.getTranslation(this.item);
      if (translation) {
        x += translation.dx;
      }
      return x;
    },
    y() {
      let y = Math.min(this.item.y1, this.item.y2);
      let translation = ItemHelper.getTranslation(this.item);
      if (translation) {
        y += translation.dy;
      }
      return y;
    },
    width() {
      return Math.abs(this.item.x1 - this.item.x2);
    },
    height() {
      return Math.abs(this.item.y1 - this.item.y2);
    }
  },

  methods: {
    // if bbox() is below computed: than
    // there a some caching-problems. (wrong bbox on other page)
    bbox() {
      if (this.$refs.item) {
        const bbox = this.$refs.item.getBBox();
        const margin = 2;
        return {
          x: bbox.x - margin,
          y: bbox.y - margin,
          width: bbox.width + 2 * margin,
          height: bbox.height + 2 * margin
        }
      } else {
        return {};
      }
    },

    selected(item) {
      return ItemHelper.isSelected(item);
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.selection {
  fill: #99f;
  stroke: #66f;
  opacity: 0.3;
}
</style>
