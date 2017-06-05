<template>
  <div>
    <headline></headline>
    <div class="headline-gap"></div>
    <h1>{{ msg }}</h1>
  </div>
</template>

<script>
import Headline from './Headline.vue'

export default {
  name: '',
  data () {
    return {
      msg: 'single page'
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

