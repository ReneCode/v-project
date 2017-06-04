<template>
  <div>
  <headline></headline>
    <div class="headline-gap"></div>

    <div class="flex-container">
      <div v-for="project in projects" class="flex-item project-preview" v-on:click="selectProject(project)">
        <project-preview  :project="project">
        </project-preview>
      </div>
    </div>
  </div>
</template>

<script>
import Headline from './Headline.vue'
import ProjectPreview from './ProjectPreview';
import { ProjectService } from '../service/project-service';

export default {
  name: 'hello',
  components: {
    Headline,
    ProjectPreview
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
    },

    selectProject(project) {
      console.log("project:", project.name);
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
