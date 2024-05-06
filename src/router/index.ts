import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import StudentLoginView from "../router/login/StudentLoginView.vue";
import EnterpriseLoginView from "../router/login/EnterpriseLoginView.vue";
import ManagerLogin from "../router/manager/ManagerLogin.vue";
import ManagerHome from "@/router/manager/ManagerHome.vue";
import HrFirmRegisterHome from "@/router/hrenterpriseregist/HrFirmRegisterHome.vue";
import EnterpriseRegister from "@/router/hrenterpriseregist/EnterpriseRegister.vue";
import HrRegisterHome from "@/router/hrenterpriseregist/HrRegisterHome.vue";
import StudentRegisterView from "@/router/student/register/StudentRegisterView.vue";
import HumanResourceHome from "@/router/enterprise/home/HumanResourceHome.vue";
import EnterpriseHome from "@/router/enterprise/home/EnterpriseHome.vue";
import ChatHome from "@/components/enterprise/function/chat/ChatHome.vue";
import ChatLoginHome from "@/components/enterprise/function/chat/ChatLoginHome.vue";
import PostSubmitSituationView from "@/router/enterprise/submit/PostSubmitSituationView.vue";
import StudentHomePage from "@/router/student/homepage/StudentHomePage.vue";
import StudentSearchPage from "@/router/student/homepage/StudentSearchPage.vue";
import StudentMainSearch from "@/router/student/homepage/StudentMainSearch.vue";
import SpecificPostInfo from "@/router/student/homepage/SpecificPostInfo.vue";
import StudentResume from "@/router/student/StudentResume.vue";
import StudentPost from "@/router/student/StudentPost.vue";
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
    path: '/enterpriseHome',
    name: 'enterpriseHome',  //企业主页
    component:EnterpriseHome
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
    path:'/hrRegisterHome',
    name:'hrRegisterHome',   // hr注册界面（企业以及入驻）
    component:HrRegisterHome
  },
  {
    path:'/StudentRegisterView',
    name:'StudentRegisterView',   // 学生注册界面
    component:StudentRegisterView
  },
  {
    path:'/humanResourceHome',
    name:'humanResourceHome',   // hr登入后的主页面
    component:HumanResourceHome
  },
  {
    path:'/chatHome',
    name:'chatHome',   // 聊天
    component:ChatHome
  },
  {
    path:'/chatLoginHome',
    name:'chatLoginHome',   // 聊天
    component:ChatLoginHome
  },
  {
    path: '/postSubmitSituationView/:postId', // 在路径中定义了 postId 参数
    name: 'postSubmitSituationView',
    component: PostSubmitSituationView,
    props: true // 开启props传参
  }
  ,

  {
    path:'/studentHomePage',
    name:'studentHomePage',   // 学生首页
    component:StudentHomePage
  },
  {
    path: '/studentSearchPage/:bigType/:smallType',
    name: 'studentSearchPage',
    component: StudentSearchPage,
    props: true // 启用 props 接收路由参数
  },
  {
    path: '/studentMainSearch/:searchValue/:searchData',
    name: 'studentMainSearch',
    component: StudentMainSearch,
    props: true // 启用 props 接收路由参数
  },
  {
    path: '/specificPostInfo/:postName',
    name: 'specificPostInfo',
    component: SpecificPostInfo,
    props: true // 启用 props 接收路由参数
  },
  {
    path: '/studentResume',
    name: 'studentResume',
    component: StudentResume
  },
  {
    path: '/studentPost',
    name: 'studentPost',
    component: StudentPost
  }

]

const router = createRouter({
  history: createWebHistory(),
  routes: routes
})

export default router
