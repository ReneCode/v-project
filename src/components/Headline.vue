<template>
<nav class="navbar navbar-inverse navbar-fixed-top">
  <div class="container-fluid">
    <div class="navbar-header">
      <button type="button" class="navbar-toggle collapsed"></button>
      <a href="/" class="navbar-brand">CS2</a>
    </div>

    <div class="navbar-collapse collapse">
      <ul class="nav navbar-nav navbar-left">
        <li>
          <router-link to="/projects">Projects</router-link>
        </li>
      </ul>

      <ul v-if="DEBUG_MODE" class="nav navbar-nav navbar-left">
        <li>
          <router-link to="/hello">Hello</router-link>
        </li>
      </ul>

      <div class="navbar-text title">{{title}}</div>

      <ul class="nav navbar-nav navbar-right">
        <li>
          <a id="logout" href="#" v-show="isLoggedIn" v-on:click="logout()">Logout</a>
          <a id="login" href="#" v-show="!isLoggedIn" v-on:click="login()">Login</a>
        </li>
      </ul>
      <p class="navbar-text navbar-right">{{username}}</p>
    </div>
  </div>
</nav>
</template>

<script>
import auth from '../services/auth-service'

export default {
  name: 'headline',
  props: [
    'title'
  ],
  data () {
    return {
      DEBUG_MODE: false
    }
  },
  computed: {
    username() {
      return auth.getUserName();
    },

    isLoggedIn() {
      return auth.isLoggedIn();
    }

  },

  created() {
  },

  methods: {
    login() {
      auth.login();
    },
    logout() {
      auth.logout();
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
