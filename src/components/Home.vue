<template>
  <div class="hello">
    <headline></headline>
    <div class="headline-gap"></div>
    <h1>{{ msg }}</h1>
  </div>
</template>

<script>
import Headline from './Headline.vue'

export default {
  name: 'home',
  data () {
    return {
      msg: 'Welcome to the Vue App'
    }
  },
  components: {
    Headline
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.headline-gap {
    margin-top: 50px;
}
</style>

