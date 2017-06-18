<template>
  <div class="hello">
    <headline></headline>
    <div class="headline-gap"></div>
    <router-link v-if="isLoggedIn" to="/projects">
      <h1>Projects</h1>
    </router-link>
    <h1 v-if="!isLoggedIn" v-on:click="login">Login</h1>
  </div>
</template>

<script>
import Headline from './Headline.vue'
import auth from "../services/auth-service";

export default {
  name: 'home',
  components: {
    Headline
  },

  computed: {
    isLoggedIn() {
      return auth.isLoggedIn();
    }
  },

  methods: {
    login() {
      auth.login();
    }
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

  cursor: pointer;
}

a:hover {
  text-decoration: none;
  color: #333;
}
</style>

