<template>
  <div>
    <headline :title="title"></headline>
    <div class="headline-gap"></div>
    <div>ProjectId: {{ projectId }}</div>
    <div>PageId: {{ pageId }}</div>
    <div>Page: {{ page }}</div>
    <pre>
    {{svg}}
    </pre>
    <div>{{rawSvg}}</div>
  </div>
</template>

<script>
import Headline from './Headline.vue'
import { ProjectService } from '../service/project-service'

export default {
  name: '',
  data () {
    return {
      title: undefined,
      projectId: undefined,
      pageId: undefined,
      projectService: undefined,
      page: undefined,
      svg: undefined,
      rawSvg: undefined
    }
  },
  components: {
    Headline
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
      // this.svg = svg;
      var template = document.createElement('DIV');
      template.innerHTML = svg;
      // var ele = template.content.firstChild;
      var svgEle = template.querySelector("svg")
      this.rawSvg = svgEle.cloneNode(true);
      console.log(this.rawSvg);
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
</style>

