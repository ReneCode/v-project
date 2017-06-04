<template>
  <div>
    <headline :title="title"></headline>

    <div class="headline-gap"></div>

    <div class="flex-container">
     <div v-for="page in pages" class="flex-item page-preview" v-on:click="selectPage(page)">
       <page-preview :page="page" />
     </div>
    </div>
  </div>
</template>

<script>
import Headline from './Headline.vue'
import PagePreview from './PagePreview.vue'
import { ProjectService } from "../service/project-service";

export default {
  name: 'project',
  components: {
    Headline,
    PagePreview
  },
  data() {
    return {
      projectId: 0,
      title: "",
      pages: []
    }
  },

  beforeMount() {
    this.projectId = this.$route.params.id;
    const projectService = new ProjectService();
    projectService.getPages(this.projectId)
    .then((pages) => {
      this.pages = pages;
    })

    projectService.getProject(this.projectId)
    .then(project => {
      this.title = `${project.name} [${project.version}]`;
    })
  },

  computed() {
    return {
    }
  },

  methods: {
    selectPage(page) {
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.headline-gap {
    margin-top: 50px;
}

.flex-container {
  margin: 30px auto;
  display: -webkit-box;
  display: -moz-box;
  display: -ms-flexbox;
  display: -webkit-flex;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.flex-item {
  border: 1px solid #bbb;
  margin: 10px;
  height: 150px;
  width: 200px;
  background-color: #eaeaea;
}

.page-preview {
  cursor: pointer;
  font-size: 12px;
}

</style>
