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
        <a-menu-item key="1">公司主页</a-menu-item>
        <a-menu-item key="2">实习岗位</a-menu-item>
        <a-menu-item key="3">nav 3</a-menu-item>
      </a-menu>
    </a-layout-header>
    <a-layout-content style="padding: 0 50px">
      <div :style="{ background: '#fff', padding: '24px', minHeight: '280px' }">Content</div>
    </a-layout-content>
    <a-layout-footer style="text-align: center">
      practice ©2024 Created by bjut
    </a-layout-footer>
  </a-layout>
</template>



<script lang="ts" setup>
import { ref } from 'vue';
import EnterprisePageHeader from "@/components/enterprise/EnterprisePageHeader.vue";
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
