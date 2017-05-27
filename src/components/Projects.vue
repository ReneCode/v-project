<template>
  <div>
  <headline></headline>
      <div class="headline-gap"></div>

    <li v-for="project in projects">
      <router-link :to="'/project/' + project.id">{{project.name}}</router-link>
    </li>
  </div>
</template>

<script>
import Headline from './Headline.vue'
// import ProjectService from '../service/project-service';
import { ProjectService } from '../service/project-service';

export default {
  name: 'hello',
  components: {
    Headline
  },
  data () {
    return {
      projects: []
    }
  },

  beforeMount() {
    this.loadProjects();
  },

  methods: {
    loadProjects() {
      const projectService = new ProjectService();
      projectService.getProjects()
      .then((projects) => {
        this.projects = projects;
      },
      (err) => {
        console.log("error", err);
      });
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.headline-gap {
    margin-top: 50px;
}
</style>
