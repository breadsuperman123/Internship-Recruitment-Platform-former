<template>
  <a-layout>
    <a-layout-header>
      <div class="logo" />
      <a-menu
          v-model:selectedKeys="selectedKeys"
          theme="dark"
          mode="horizontal"
          :style="{ lineHeight: '64px' }"
      >
        <a-menu-item key="1" @click="goToHomePage">首页</a-menu-item>
        <a-menu-item key="2">职位百科</a-menu-item>
        <a-dropdown>
          <template v-slot:overlay>
            <a-menu style="width: 200px">
              <student-prim-page></student-prim-page>
            </a-menu>
          </template>
          <a-menu-item key="3">我的</a-menu-item>
        </a-dropdown>
      </a-menu>
    </a-layout-header>
    <a-layout-content style="padding: 0 50px">
      <a-breadcrumb style="margin: 16px 0">
        <a-breadcrumb-item>Home</a-breadcrumb-item>
        <a-breadcrumb-item>List</a-breadcrumb-item>
        <a-breadcrumb-item>App</a-breadcrumb-item>
      </a-breadcrumb>
      <a-layout style="padding: 24px 0; background: #fff">
        <a-layout-sider width="200" style="background: #fff; height: 80vh; position: fixed;">
          <div class="sidebar-title" >{{ sidebarTitle }}</div>
          <a-menu
              v-model:selectedKeys="selectedKeys2"
              v-model:openKeys="openKeys"
              mode="inline"
              style="height: 100%"
          >
            <a-menu-item key="1">
              <user-outlined />
              <a href="#eduInfo">教育信息</a>
            </a-menu-item>
            <a-menu-item key="2">
              <user-outlined />
              <a href="#practiceInfo"> 实习经历 </a>
            </a-menu-item>
            <a-menu-item key="3">
              <notification-outlined />
              <a href="#organizationInfo"> 社团/组织经历</a>
            </a-menu-item>
            <a-menu-item key="4">
              <notification-outlined />
              <a href="#projectInfo"> 学术/项目经历</a>
            </a-menu-item>
            <a-menu-item key="5">
              <laptop-outlined />
              <a href="#certificationInfo">获奖经历</a>
            </a-menu-item>
            <a-menu-item key="6">
              <laptop-outlined />
              <a href="#LocalResume"> 简历附件</a>
            </a-menu-item>
          </a-menu>
        </a-layout-sider>
        <a-layout-content :style="{ marginLeft: '200px' }">
          <resume-content></resume-content> <!-- 使用新创建的组件 -->
          <div style="height: 800px;"></div>
        </a-layout-content>
      </a-layout>
    </a-layout-content>
    <a-layout-footer style="text-align: center">
      Ant Design ©2018 Created by Ant UED
    </a-layout-footer>
  </a-layout>
</template>

<script lang="ts" setup>
import ResumeContent from '../../components/student/ResumeContent.vue'; // 引入新创建的组件
import { ref } from 'vue';
import { UserOutlined, LaptopOutlined, NotificationOutlined } from '@ant-design/icons-vue';
import router from "@/router";
import StudentPrimPage from "@/router/student/homepage/StudentPrimPage.vue";
const sidebarTitle = ref('在线简历');
const selectedKeys1 = ref<string[]>(['2']);
const selectedKeys2 = ref<string[]>(['1']);
const openKeys = ref<string[]>(['sub1']);

const selectedKeys = ref<string[]>(['3']);

function goToHomePage() {
  // 使用 router.push() 方法跳转到学生首页
  router.push({ name: 'studentHomePage' }); // 假设学生首页的路由名为 'studentHomePage'
}


</script>
<style scoped>
#components-layout-demo-top-side .logo {
  float: left;
  width: 120px;
  height: 31px;
  margin: 16px 24px 16px 0;
  background: rgba(255, 255, 255, 0.3);
}


.ant-row-rtl #components-layout-demo-top-side .logo {
  float: right;
  margin: 16px 0 16px 24px;
}
.sidebar-title {
  font-size: 18px;
  padding: 16px;
  text-align: center;
  font-weight: bold;

}

.site-layout-background {
  background: #fff;
}

</style>
