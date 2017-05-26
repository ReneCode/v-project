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
  name: 'hello',
  components: {
    Headline
  },
  data () {
    return {
      msg: 'Projects'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
