import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import Home from '@/components/Home'
import Projects from '@/components/Projects'
import Project from '@/components/Project'

Vue.use(Router)

export default new Router({
  routes: [
    { path: '/hello', name: 'hello', component: Hello },
    { path: '/projects', name: 'projects', component: Projects },
    { path: '/project/:id', name: 'project', component: Project },
    { path: '/', name: 'home', component: Home } ]
});
