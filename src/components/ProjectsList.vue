<template>
  <div>
  <headline></headline>
    <div class="headline-gap"></div>

    <search title="Projects" @search="onSearch"></search>

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
  data () {
    return {
      projects: [],
      searchValue: ''
    }
  },

  beforeMount() {
    this.loadProjects();
  },

  methods: {
    loadProjects() {
      const projectService = new ProjectService();
      projectService.getProjects(this.searchValue)
      .then((projects) => {
        this.projects = projects;
      },
      (err) => {
        console.log("error", err);
      });
    },

    selectProject(project) {
      const urlService = new UrlService();
      const link = urlService.getLink('projectByProjectId', project.id);
      this.$router.push(link);
    },

    onSearch(value) {
      this.searchValue = value;
      this.loadProjects();
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
