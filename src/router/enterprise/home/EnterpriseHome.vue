<template>
  <a-layout class="layout">
    <enterprise-page-header></enterprise-page-header>
    <a-layout-header>
      <div class="logo" />
      <a-menu
          v-model:selectedKeys="selectedKeys"
          theme="dark"
          mode="horizontal"
          :style="{ lineHeight: '64px' }"
      >
        <a-menu-item key="1">部门岗位</a-menu-item>
        <a-menu-item key="2">公司岗位</a-menu-item>
      </a-menu>
    </a-layout-header>
    <a-layout-content style="padding: 0 50px">
      <div :style="{ background: '#fff', padding: '24px', minHeight: '280px' }">
        <div v-if="selectedKeys==1" class="content">
          <department-posts></department-posts>
        </div>
        <div v-else-if="selectedKeys==2" class="content">
          <enterprise-posts></enterprise-posts>
        </div>
      </div>
    </a-layout-content>
    <a-layout-footer style="text-align: center">
      practice ©2024 Created by bjut
    </a-layout-footer>
  </a-layout>
</template>



<script lang="ts" setup>
import { ref } from 'vue';
import EnterprisePageHeader from "@/components/enterprise/home/EnterprisePageHeader.vue";
import DepartmentPosts from "@/router/enterprise/post/DepartmentPosts.vue";
import EnterprisePosts from "@/router/enterprise/post/EnterprisePosts.vue";
const selectedKeys = ref<string[]>(['2']);



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
