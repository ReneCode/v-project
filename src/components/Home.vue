<template>
  <div class="hello">
    <headline></headline>
    <div class="headline-gap"></div>
    <router-link to="/projects"><h1>{{ msg }}</h1></router-link>
  </div>
</template>

<script>
import Headline from './Headline.vue'

export default {
  name: 'home',
  data () {
    return {
      msg: 'Projects'
    }
  },
  components: {
    Headline
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped >
.headline-gap {
    margin-top: 50px;
}
h1 {
	margin: 150px;
	padding-left: 40px;
	padding-top: 80px;
	padding-bottom: 40px;
	font-family: "arial";
	font-size: 56px;
	font-weight: bold;
	color: #333;

	border-left: 10px dotted #ccc;
	border-bottom: 1px dotted #bbb;
}
a:hover {
  text-decoration: none;
  color: #333;
}
</style>

