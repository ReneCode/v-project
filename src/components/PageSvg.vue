// wait for svg-loader directive until svg is loaded

<template>
  <svg width="1200" height="700" :viewBox="viewBox">
    <g :transform="transform">
      <g v-if="svg" v-svg-loader="{svg:svg, callback:svgLoaderCallback}">
      </g>
      <g class="redlining">
        <svg-item v-for="item in items" :key="item.id" :item="item"></svg-item>
      </g>
    </g>
  </svg>
</template>

<script>
import { ProjectService } from '../services/project-service'
import SvgLoader from '../directives/svg-loader'
import SvgTransformer from '../util/svg-transformer'
import SvgInteraction from '../util/svg-interaction'
import EventBus from '../util/event-bus';
import SvgItem from './SvgItem';

export default {
  name: 'page-svg',
  props: [
    'page',
    'width', 'height'
  ],
  data() {
    return {
      svg: undefined,
      viewBox: undefined,
      transform: undefined,
      items: []
    }
  },
  components: {
    SvgLoader,
    SvgItem
  },
  beforeMount() {
    this.projectService = new ProjectService();
    EventBus.on('addTextItem', this.addText);

    this.getPageData();
  },

  beforeDestroy() {
    EventBus.off('addTextItem', this.addText);
  },

  mounted() {
    this.svgTransformer = new SvgTransformer(this.$el, this.updateTransform)
    this.svgInteraction = new SvgInteraction(this.$el, this.svgTransformer);
  },

  methods: {
    updateTransform(transform) {
      this.transform = transform;
    },
    svgLoaderCallback(ev) {
      switch (ev.msg) {
        case "viewBox":
          this.viewBox = ev.val;
          this.getRedlinings()
      }
    },

    getPageData() {
      if (!this.page) {
        throw new Error("page not set")
      }
      this.title = `${this.page.properties[11000]} ${this.page.properties[11011]}`;
      return this.projectService.getSvg(this.page.projectId, this.page.sortId)
        .then((svg) => {
          this.svg = svg;
        });
    },

    getTranslateY() {
      if (!this.viewBox) {
        throw new Error("viewBox not set")
      }
      const coords = this.viewBox.split(' ');
      if (coords.length === 4) {
        return coords[3];
      }
      return undefined;
    },

    getRedlinings() {
      if (!this.page) {
        throw new Error("page not set")
      }
      let options = {
        pageTblObjectId: this.page.tblObjectId,
        translateY: this.getTranslateY()
      };
      return this.projectService.getRedlinings(this.page.projectId, options)
        .then((redlinings) => {
          this.items = redlinings;
        });
    },

    addText(textValue) {
      let text = {
        type: "text",
        text: textValue,
        x: Math.floor(Math.random() * 400),
        y: Math.floor(Math.random() * 300),
        fontSize: 5 + Math.floor(Math.random() * 20),
        fill: "#6ad"
      };
      this.items.push(text);
    }
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>

.redlining {
  cursor: pointer;
}
</style>

