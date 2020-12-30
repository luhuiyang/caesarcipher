import Vue from 'vue'
import VueRouter from 'vue-router'
import TextInput from '../components/TextInput.vue'
import Lucky from '../components/Lucky.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: TextInput
  },
  {
    path: '/iloveyou',
    name: 'iloveyou',
    component: Lucky
  },
]

const router = new VueRouter({
  routes
})

export default router
