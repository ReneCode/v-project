<template>
  <div>
    <headline></headline>
    <div class="headline-gap"></div>
  
    <search title="Projects" v-model="search"></search>
  
    <div class="flex-container">
      <div v-for="project in projects" :key="project.id" class="flex-item project-preview" v-on:click="selectProject(project)">
        <project-card :project="project">
        </project-card>
      </div>
    </div>
  </div>
</template>

<script>
import Headline from './Headline.vue'
import ProjectCard from './ProjectCard';
import Search from './Search';
import { UrlService } from '../services/url-service'
import ProjectService from '../services/project-service';

export default {
  name: '',
  components: {
    Headline,
    ProjectCard,
    Search
  },
  data() {
    return {
      projects: [],
      search: ''
    }
  },

  watch: {
    search(newVal, oldVal) {
      this.search = newVal;
      const url = window.location.pathname;
      this.$router.push({
        path: url,
        query: { q: newVal }
      });
    }
  },

  // route will change
  beforeRouteUpdate(to, from, next) {
    this.updateProjectList(to);
    // do'nt forget to call next()
    next();
  },

  beforeMount() {
    this.urlService = new UrlService();
    this.projectService = new ProjectService();

    this.updateProjectList(this.$route);
  },

  methods: {
    updateProjectList(route) {
      const query = route.query;
      const q = query.q;
      this.search = q;

      this.projectService.getProjects(q).then(
        projects => {
          this.projects = projects;
        },
        err => {
          console.error(err);
        });
    },

    selectProject(project) {
      const link = this.urlService.getLink('projectByProjectId', project.id);
      this.$router.push(link);
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
  height: 200px;
  width: 300px;
  background-color: #eaeaea;
}

.project-preview {
  cursor: pointer;
}
</style>
