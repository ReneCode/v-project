import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import Home from '@/components/Home'
import ProjectsList from '@/components/ProjectsList'
import PageList from '@/components/PageList'
import Page from '@/components/Page'
import Capture from '@/components/Capture'
import Callback from '@/components/Callback'

import authService from '../services/auth-service';

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
    { path: '/projects', name: 'projects', component: ProjectsList, beforeEnter: requireAuth },
    { path: '/project/:projectId', name: 'project', component: PageList, beforeEnter: requireAuth },
    { path: '/project/:projectId/page/:pageId', name: 'page', component: Page, beforeEnter: requireAuth },
    { path: '/project/:projectId/page/:pageId/capture', name: 'capture', component: Capture },
    { path: '/', name: 'home', component: Home },
    { path: '/callback', component: Callback }]
});
