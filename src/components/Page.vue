<template>
  <div>
    <headline :title="title"></headline>
    <div class="headline-gap"></div>
    <div class="flex-container">
      <toolbar></toolbar>
      <page-svg class="svg-page"
        :projectId="projectId" :pageId="pageId" :width="500" :height="400" >
      </page-svg>
    </div>
  </div>
</template>

<script>
import Headline from './Headline.vue'
import Toolbar from './Toolbar.vue'
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
    PageSvg,
    Toolbar
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
  background-color: #eee;
  flex-grow:1;
}
.flex-container {
  display: flex;
  flex-direction: row;
}
</style>

