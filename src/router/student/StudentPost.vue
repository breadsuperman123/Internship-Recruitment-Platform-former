<template>
  <a-layout>
    <a-layout-header class="header">
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
              <a href="">投递记录</a>
            </a-menu-item>
            <a-menu-item key="2">
              <user-outlined />
              <a href=""> 岗位收藏 </a>
            </a-menu-item>
          </a-menu>
        </a-layout-sider>
        <a-layout-content :style="{ marginLeft: '200px' }">
          <div style="height: 800px;">
            <post-record></post-record> <!-- 使用新创建的组件 -->
          </div>
        </a-layout-content>
      </a-layout>
    </a-layout-content>

  </a-layout>
</template>

<script lang="ts" setup>
import ResumeContent from '../../components/student/ResumeContent.vue'; // 引入新创建的组件
import { ref } from 'vue';
import { UserOutlined, LaptopOutlined, NotificationOutlined } from '@ant-design/icons-vue';
import StudentPrimPage from "@/router/student/homepage/StudentPrimPage.vue";
import router from "@/router";
import PostRecord from "@/components/student/PostRecord.vue";

const sidebarTitle = ref('我的投递');
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
