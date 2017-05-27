<template>
  <div>
    <headline></headline>

        <div class="headline-gap"></div>

    <h1>Project</h1>
    <h3>{{ projectId }}</h3>

    <ul>
     <li v-for="page in pages">{{page.id}}</li>
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
