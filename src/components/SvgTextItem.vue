
<template>
  <g>
    <rect v-if="selected(item)" class="selection" :x="bbox().x" :y="bbox().y" :width="bbox().width" :height="bbox().height" :transform="transformMatrix"></rect>
  
    <text ref="textitem" v-if="lines.length===1" :gid="item.id" :transform="transformMatrix" :font-size="item.fontSize" :fill="item.fill">{{item.text}}</text>
    <text ref="textitem" v-else :gid="item.id" :transform="transformMatrix" :font-size="item.fontSize" :fill="item.fill">
      <tspan v-for="(line,idx) in lines" :key="idx" :x="0" dy="1em">{{line}}</tspan>
    </text>
  </g>
</template>

<script>
import ItemHelper from '@/util/item-helper';

export default {
  name: 'svg-text-item',
  props: ['item'],

  computed: {
    transformMatrix() {
      let x = this.item.x;
      let y = this.item.y;
      let translation = ItemHelper.getTranslation(this.item);
      if (translation) {
        x += translation.dx;
        y += translation.dy;
      }
      return `matrix(1,0,0,1,${x},${y})`;
    },

    lines() {
      if (this.item.text) {
        return this.item.text.split('\n');
      } else {
        return [];
      }
    }
  },

  methods: {
    // if bbox() is below computed: than
    // there a some caching-problems. (wrong bbox on other page)
    bbox() {
      if (this.$refs.textitem) {
        const bbox = this.$refs.textitem.getBBox();
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
      return item.selected;
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
