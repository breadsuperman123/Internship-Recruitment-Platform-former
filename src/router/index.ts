import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import StudentLoginView from "../router/login/StudentLoginView.vue";
import EnterpriseLoginView from "../router/login/EnterpriseLoginView.vue";
import EnpterpriseView from './enterprise/EnpterpriseView.vue';
import ManagerLogin from "../router/manager/ManagerLogin.vue";
import StudentView from "../router/student/StudentView.vue";
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
    component:StudentView
  },
  {
    path: '/enterpriseHome',
    name: 'enterpriseHome',
    component:EnpterpriseView
  },
  {
    path:'/managerLogin',
    name:'managerLogin',
    component:ManagerLogin
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes: routes
})

export default router
