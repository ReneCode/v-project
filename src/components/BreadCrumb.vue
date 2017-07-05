<template>
  <div class="row">
    <div class="breadcrumb-header col-xs-12 text-left">
  
      <ul class="breadcrumb">
        <li v-for="(crumb, index) in crumbs" :key="crumb">
          <router-link v-if="crumb.url" :to="crumb.url">{{crumb.name}}</router-link>
          <span v-else>{{crumb.name}}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>

export default {
  props: [
    'crumbs'
  ],
  data() {
    return {
    }
  },
  computed: {
  },
  components: {
  },
  methods: {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.breadcrumb-header {
  margin: 0px;
}

.breadcrumb {
  margin: 0px;
  background-color: transparent;
}
</style>

