<template>
  <div>
    <headline :title="title"></headline>
    <div class="headline-gap"></div>
    <div class="flex-container">
      <toolbar></toolbar>
      <page-svg v-if="page" class="svg-page" :page="page" :width="500" :height="400">
      </page-svg>
    </div>
  </div>
</template>

<script>
import Headline from './Headline.vue'
import Toolbar from './Toolbar.vue'
import PageSvg from './PageSvg.vue'
import { ProjectService } from '../services/project-service'

export default {
  name: '',
  data() {
    return {
      title: undefined,
      page: undefined
    }
  },
  components: {
    Headline,
    PageSvg,
    Toolbar
  },
  beforeMount() {
    const projectId = this.$route.params.projectId;
    const pageId = this.$route.params.pageId;

    const projectService = new ProjectService();
    projectService.getPage(projectId, pageId)
      .then((page) => {
        this.page = page;
      });
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
  flex-grow: 1;
}

.flex-container {
  display: flex;
  flex-direction: row;
}
</style>

