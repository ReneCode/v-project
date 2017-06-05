<template>
  <div class="name">
  {{page.properties[11000]}} {{page.properties[11011]}}
  </div>
</template>

<script>
// import { ProjectService } from "../service/project-service";

export default {
  name: 'page-card',
  components: {
  },
  props: ['page'],

  data() {
    return {
      countPages: 0
    }
  },

  beforeMount() {
//    let projectService = new ProjectService();
  },

  computed: {
  },

  methods: {

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.name {
  margin-top: 5px;
  margin-left: 5px;
}
</style>
