<template>
  <div>
  {{page.properties[11000]}} {{page.properties[11011]}}
  </div>
</template>

<script>
// import { ProjectService } from "../service/project-service";

export default {
  name: 'page-preview',
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

</style>
