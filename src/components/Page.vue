<template>
  <div>
    <headline :title="title"></headline>
    <div class="headline-gap"></div>
    <page-svg class="svg-page"
      :projectId="projectId" :pageId="pageId" :width="600" :height="400">
      </page-svg>
  </div>
</template>

<script>
import Headline from './Headline.vue'
import PageSvg from './PageSvg.vue'

export default {
  name: '',
  data() {
    return {
      title: undefined,
      projectId: undefined,
      pageId: undefined,
      projectService: undefined
    }
  },
  components: {
    Headline,
    PageSvg
  },
  beforeMount() {
    this.projectId = this.$route.params.projectId;
    this.pageId = this.$route.params.pageId;
  },

  methods: {
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.headline-gap {
  margin-top: 50px;
}
.svg-page {
  text-align: center;
  padding: 10px;
}
</style>

