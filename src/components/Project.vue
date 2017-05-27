<template>
  <div>
    <headline :title="projectName"></headline>

    <div class="headline-gap"></div>

    <ul>
     <li v-for="page in pages">{{page.properties[11000]}} {{page.properties[11011]}}</li>
    </ul>
  </div>
</template>

<script>
import Headline from './Headline.vue'
import { ProjectService } from "../service/project-service";

export default {
  name: 'project',
  components: {
    Headline
  },
  data() {
    return {
      projectId: 0,
      projectName: "",
      pages: [{name: "abc"}]
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
      this.projectName = project.name;
    })
  },

  computed() {
    return {
    }
  },

  methods: {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.headline-gap {
    margin-top: 50px;
}
</style>
