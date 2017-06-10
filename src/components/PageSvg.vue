wait for svg-loader directive until svg is loaded

<template>
  <svg width="1200" height="700" :viewBox="viewBox" v-on:wheel="onMouseWheel">
    <g :transform="transform">
      <g v-if="svg" v-svg-loader="{svg:svg, callback:svgLoaderCallback}">
      </g>
    </g>
  </svg>
</template>

<script>
import { ProjectService } from '../service/project-service'
import SvgLoader from '../directives/svg-loader'
import SvgTransformer from '../util/svg-transformer'

export default {
  name: 'page-svg',
  props: [
    'page',
    'projectId', 'pageId',
    'width', 'height'
  ],
  data() {
    return {
      svg: undefined,
      viewBox: undefined,
      transform: undefined
    }
  },
  components: {
    SvgLoader
  },
  beforeMount() {
    this.projectService = new ProjectService();

    if (!this.page) {
      this.projectService.getPage(this.projectId, this.pageId)
        .then((page) => {
          this.getPageData(page);
        });
    } else {
      this.getPageData(this.page);
    }
  },

  mounted() {
    this.svgTransformer = new SvgTransformer(this.$el, this.updateTransform)
  },

  methods: {
    updateTransform(transform) {
      this.transform = transform;
    },
    svgLoaderCallback(ev) {
      switch (ev.msg) {
        case "viewBox":
          this.viewBox = ev.val;
      }
    },
    onMouseWheel(ev) {
      const event = window.event || ev; // old IE support
      const delta = Math.max(-1, Math.min(1, (event.wheelDelta || -event.detail)));
      if (delta > 0) {
        this.svgTransformer.zoomIn(event);
      } else if (delta < 0) {
        this.svgTransformer.zoomOut(event);
      }
      // for IE
      event.returnValue = false;
      // for Chrome and Firefox
      if (event.preventDefault) {
        event.preventDefault();
      }
    },

    getPageData(page) {
      this.title = `${page.properties[11000]} ${page.properties[11011]}`;
      return this.projectService.getSvg(page.projectId, page.sortId)
        .then((svg) => {
          this.svg = svg;
        });
    }
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>

</style>

