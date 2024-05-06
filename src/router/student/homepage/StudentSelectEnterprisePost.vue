<template>
  <a-layout class="layout">
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
    <student-enterprise-header :enterpriseInfo="route.params.enterpriseInfo"></student-enterprise-header>
    <a-layout-content style="padding: 0 50px">
      <div :style="{ background: '#fff', padding: '24px', minHeight: '280px' }">
        <student-enterprise-post-all :postInfo="route.params.searchData"></student-enterprise-post-all>
      </div>
    </a-layout-content>
    <a-layout-footer style="text-align: center">
      practice ©2024 Created by bjut
    </a-layout-footer>
  </a-layout>
</template>



<script lang="ts" setup>
import { ref } from 'vue';
import StudentPrimPage from "@/router/student/homepage/StudentPrimPage.vue";
import StudentEnterpriseHeader from "@/router/student/homepage/StudentEnterpriseHeader.vue";
import {useRoute} from "vue-router";
import axios from "axios";
import router from "@/router";
import StudentEnterprisePostAll from "@/router/student/homepage/StudentEnterprisePostAll.vue";
import StudentFilter from "@/router/student/homepage/StudentFilter.vue";
const selectedKeys = ref<string[]>(['2']);
const route = useRoute();
console.log("studentSelect",route.params.enterpriseInfo)
function goToHomePage() {
  // 使用 router.push() 方法跳转到学生首页
  router.push({ name: 'studentHomePage' }); // 假设学生首页的路由名为 'studentHomePage'
}
</script>



<style scoped>

#components-layout-demo-top .logo {
  float: left;
  width: 120px;
  height: 31px;
  margin: 16px 24px 16px 0;
  background: rgba(255, 255, 255, 0.3);
}
.ant-row-rtl #components-layout-demo-top .logo {
  float: right;
  margin: 16px 0 16px 24px;
}


</style>
