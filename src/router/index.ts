import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import StudentLoginView from "../router/login/StudentLoginView.vue";
import EnterpriseLoginView from "../router/login/EnterpriseLoginView.vue";
import EnpterpriseView from './enterprise/EnpterpriseView.vue';
import ManagerLogin from "../router/manager/ManagerLogin.vue";
import StudentView from "../router/student/StudentView.vue";
import ManagerHome from "@/router/manager/ManagerHome.vue";
import HrFirmRegisterHome from "@/router/hrenterpriseregist/HrFirmRegisterHome.vue";
import EnterpriseRegister from "@/router/hrenterpriseregist/EnterpriseRegister.vue";
import HrRegisterHome from "@/router/hrenterpriseregist/HrRegisterHome.vue";
const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect:'/studentLogin'  // 重定向到学生登录页面
  },
  {
    path: '/studentLogin',
    name: 'studentLogin',   // 学生登陆页面
    component: StudentLoginView
  },
  {
    path: '/enterpriseLogin',// 企业登录页面
    name: 'enterpriseLogin',
    component: EnterpriseLoginView
  },
  {
    path: '/studentHome', // 学生主页
    name: 'studentHome',
    component:StudentView
  },
  {
    path: '/enterpriseHome',
    name: 'enterpriseHome',  //企业主页
    component:EnpterpriseView
  },
  {
    path:'/managerLogin',
    name:'managerLogin',  // 管理员登录
    component:ManagerLogin
  },{
    path:'/managerHome',
    name:'managerHome',   // 管理员主页
    component:ManagerHome
  },
  {
    path:'/hrFirmRegisterHome',
    name:'hrFirmRegisterHome',   // 企业和管理员注册选择页面
    component:HrFirmRegisterHome
  },
  {
    path:'/enterpriseRegister',
    name:'enterpriseRegister',   //企业入驻页面
    component:EnterpriseRegister
  },
  {
    path:'/hrRegister',
    name:'hrRegister',   // hr注册界面（企业以及入驻）
    component:HrRegisterHome
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes: routes
})

export default router
