<template>
  <div class="name">
  {{page.properties[11000]}} {{page.properties[11011]}}
  <!--<page-svg :page_="page" :width="190" :height="130"></page-svg>-->

  </div>
</template>

<script>
// import PageSvg from './PageSvg.vue'

export default {
  name: 'page-card',
  components: {
    // PageSvg
  },
  props: ['page']
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.name {
  margin-top: 5px;
  margin-left: 5px;
}
</style>
