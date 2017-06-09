<template>
  <div>
    <headline :title="title"></headline>
    <div class="headline-gap"></div>
    <div class="svg-frame">
    <render-svg :svg="svg"></render-svg>
    </div>
  </div>
</template>

<script>
import Headline from './Headline.vue'
import RenderSvg from './RenderSvg.vue'
import { ProjectService } from '../service/project-service'

export default {
  name: '',
  data() {
    return {
      title: undefined,
      projectId: undefined,
      pageId: undefined,
      projectService: undefined,
      svg: undefined
    }
  },
  components: {
    Headline,
    RenderSvg
  },
  beforeMount() {
    this.projectId = this.$route.params.projectId;
    this.pageId = this.$route.params.pageId;
    this.projectService = new ProjectService();

    this.projectService.getPage(this.projectId, this.pageId)
      .then((page) => {
        this.title = `${page.properties[11000]} ${page.properties[11011]}`;
        this.page = page;
        return page.sortId;
      })
      .then((sortId) => {
        return this.projectService.getSvg(this.projectId, sortId)
      })
      .then((svg) => {
        this.svg = svg;
      });
  }

  // render: function(createElement) {
  //   console.log("render")
  //   return createElement(this.rawSvg);
  // }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.headline-gap {
  margin-top: 50px;
}
.svg-frame {
  text-align: center;
  padding: 10px;
}
</style>

