import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import Home from '@/components/Home'
import Projects from '@/components/Projects'
import Project from '@/components/Project'
import Callback from '@/components/Callback'

import authService from '../service/auth-service';

Vue.use(Router)

function requireAuth(to, from, next) {
  if (!authService.isLoggedIn()) {
    next({
      path: "/"
    });
  } else {
    next();
  }
}

export default new Router({
  mode: 'history',
  routes: [
    { path: '/hello', name: 'hello', component: Hello },
    { path: '/projects', name: 'projects', component: Projects, beforeEnter: requireAuth },
    { path: '/project/:id', name: 'project', component: Project },
    { path: '/', name: 'home', component: Home },
    { path: '/callback', component: Callback }]
});