
<template>
  <g>
    <!-- <rect v-if="selected" class="selection" :x="bbox().x" :y="bbox().y" :width="bbox().width" :height="bbox().height"></rect> -->
  
    <rect ref="item" :gid="item.id" :x="x" :y="y" :width="item.width" :height="item.height" :stroke="item.stroke" :fill="item.fill"></rect>
  
    <!-- <rect v-if="selected" class="resizer" gid="resize-tl" :x="x-resizerSize/2" :y="y-resizerSize/2" :width="resizerSize" :height="resizerSize"></rect>
    <rect v-if="selected" class="resizer" gid="resize-bl" :x="x-resizerSize/2" :y="y+item.height-resizerSize/2" :width="resizerSize" :height="resizerSize"></rect>
    <rect v-if="selected" class="resizer" gid="resize-tr" :x="x+item.width-resizerSize/2" :y="y-resizerSize/2" :width="resizerSize" :height="resizerSize"></rect>
    <rect v-if="selected" class="resizer" gid="resize-br" :x="x+item.width-resizerSize/2" :y="y+item.height-resizerSize/2" :width="resizerSize" :height="resizerSize"></rect> -->
  </g>
</template>

<script>
import ItemHelper from '@/util/item-helper';

export default {
  name: 'svg-rect-item',
  props: ['item', 'selected'],

  computed: {
    resizerSize() {
      return 8;
    },
    x() {
      let x = this.item.x;
      let translation = ItemHelper.getTranslation(this.item);
      if (translation) {
        x += translation.dx;
      }
      return x;
    },
    y() {
      let y = this.item.y;
      let translation = ItemHelper.getTranslation(this.item);
      if (translation) {
        y += translation.dy;
      }
      return y;
    }
  },

  methods: {
    /*
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
    }
    */
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.selection {
  fill: #99f;
  stroke: #66f;
  opacity: 0.3;
}

.resizer {
  fill: #eee;
  stroke: #333;
  cursor: pointer;
}
</style>
