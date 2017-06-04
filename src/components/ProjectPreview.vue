<template>
  <div>
  <router-link :to="'/project/' + project.id">{{project.name}} / {{countPages}}</router-link>
  </div>
</template>

<script>
import { ProjectService } from "../service/project-service";

export default {
  name: 'project-preview',
  components: {
  },
  props: ['project'],

  data() {
    return {
      countPages: 0
    }
  },

  beforeMount() {
    let projectService = new ProjectService();
    projectService.countPages(this.project.id).then(count => {
      this.countPages = count;
    });
  },

  computed: {
  },

  methods: {

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
