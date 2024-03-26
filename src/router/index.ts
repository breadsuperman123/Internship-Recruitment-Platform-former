import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import StudentLoginView from "../router/login/StudentLoginView.vue";
import EnterpriseLoginView from "../router/login/EnterpriseLoginView.vue";
import EnpterpriseView from './enterprise/EnpterpriseView.vue';
const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect:'/studentLogin'
  },
  {
    path: '/studentLogin',
    name: 'studentLogin',
    component: StudentLoginView
  },
  {
    path: '/enterpriseLogin',
    name: 'enterpriseLogin',
    component: EnterpriseLoginView
  },
  {
    path: '/studentHome',
    name: 'studentHome',
    component:()=>import('../router/student/StudentView.vue')
  },
  {
    path: '/enterpriseHome',
    name: 'enterpriseHome',
    component:EnpterpriseView
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes: routes
})

export default router
