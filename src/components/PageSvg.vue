<template>
  <svg width="1200" height="700" :viewBox="viewBox">
    <g v-svg-loader="{svg:svg, callback:svgCallback}">
      <!--<render-svg v-on:mouse-wheel-up="onMouseWheelUp" v-on:mouse-wheel-down="onMouseWheelDown" :svg="svg" :width="width" :height="height">
      </render-svg>-->
    </g>
  </svg>
</template>

<script>
import RenderSvg from './RenderSvg.vue'
import { ProjectService } from '../service/project-service'
import SvgLoader from '../directives/svg-loader'

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
      viewBox: ""
    }
  },
  components: {
    RenderSvg,
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

  methods: {
    svgCallback(ev) {
      switch (ev.msg) {
        case "viewBox":
          this.viewBox = ev.val;
      }
      console.log("callback:", ev);
    },
    onMouseWheelUp(ev) {
      console.log("up")
    },

    onMouseWheelDown(ev) {
      console.log("down")
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

