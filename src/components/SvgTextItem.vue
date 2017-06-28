
<template>
  <g>
    <rect v-if="item.selected" class="selection" :x="bbox().x" :y="bbox().y" :width="bbox().width" :height="bbox().height" :transform="transformMatrix"></rect>
  
    <text ref="textitem" v-if="lines.length===1" :gid="item.id" :transform="transformMatrix" :font-size="item.fontSize" :fill="item.fill">{{item.text}}</text>
    <text ref="textitem" v-else :gid="item.id" :transform="transformMatrix" :font-size="item.fontSize" :fill="item.fill">
      <tspan v-for="(line,idx) in lines" :key="idx" :x="0" dy="1em">{{line}}</tspan>
    </text>
  </g>
</template>

<script>

export default {
  name: 'svg-text-item',
  props: ['item'],

  computed: {
    transformMatrix() {
      return `matrix(1,0,0,1,${this.item.x},${this.item.y})`;
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
        let bbox = this.$refs.textitem.getBBox();
        const margin = 2;
        bbox.x -= margin;
        bbox.width += 2 * margin;
        bbox.y -= margin;
        bbox.height += 2 * margin;
        return bbox;
      } else {
        return {};
      }
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
