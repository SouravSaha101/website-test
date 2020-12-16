import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Home from '../views/Home.vue'
import About from '../views/About.vue'
import Form from '../views/Form.vue'
import Profile from '../views/Profile.vue'
// import { About } from '../views/about'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    component: About
  },
  {
    path: '/form',
    name: 'Form',
    component: Form
  }, {
    path: '/profile/:uid',
    props: (route) => ({ uid: JSON.stringify(route.query.uid) }),
    component: Profile,
    name: 'Profile'
  },

]

const router = new VueRouter({
  routes
})

export default router
