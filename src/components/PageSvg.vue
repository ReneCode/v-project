<template>
  <render-svg :svg="svg" :width="width" :height="height">
  </render-svg>
</template>

<script>
import RenderSvg from './RenderSvg.vue'
import { ProjectService } from '../service/project-service'

export default {
  name: 'page-svg',
  props: [
    'page',
    'projectId', 'pageId',
    'width', 'height'
  ],
  data() {
    return {
      svg: undefined
    }
  },
  components: {
    RenderSvg
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

