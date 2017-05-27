<template>
<nav class="navbar navbar-inverse navbar-fixed-top">
  <div class="container-fluid">
    <div class="navbar-header">
      <button type="button" class="navbar-toggle collapsed"></button>
      <a href="#" class="navbar-brand">CS2</a>
    </div>

    <div class="navbar-collapse collapse">
      <ul class="nav navbar-nav navbar-left">
        <li>
          <router-link to="projects">Projects</router-link>
        </li>
      </ul>

      <div class="navbar-text title">{{title}}</div>

      <ul class="nav navbar-nav navbar-right">
        <li>
          <a href="#" v-if="!authenticated" v-on:click="login()">Login</a>
          <a href="#" v-if="authenticated" v-on:click="logout()">Logout</a>
        </li>
      </ul>
      <p class="navbar-text navbar-right">{{username}}</p>
    </div>
  </div>
</nav>
</template>

<script>
export default {
  name: 'headline',
  props: [
    'title'
  ],
  data () {
    return {
      loggedIn: false
    }
  },
  computed: {
    authenticated() {
      return this.loggedIn;
    },
    username() {
      return "abc";
    }
  },

  methods: {
    login() {
      this.loggedIn = true;
      console.log("login")
    },

    logout() {
      this.loggedIn = false;
      console.log("logout")
    }
  }
}
</script>

<style>
.title {
  color: #3ee;
  font-size: 18px;
  line-height: 20px;
  padding-left: 40px;
}
</style>
