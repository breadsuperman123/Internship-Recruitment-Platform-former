<template>
  <a-space direction="vertical" :style="{ width: '100%', height: '100vh' }">
  <a-layout>
    <a-layout-header class="header">
      <div class="logo" />
      <a-menu
          v-model:selectedKeys="selectedKeys1"
          theme="dark"
          mode="horizontal"
          :style="{ lineHeight: '64px' }"
      >
        <a-menu-item key="1">nav 1</a-menu-item>
        <a-menu-item key="2">nav 2</a-menu-item>
        <a-menu-item key="3">nav 3</a-menu-item>
      </a-menu>
    </a-layout-header>
    <img src="/slogan.png" alt="slogan" style="width: 100%;">
    <a-layout :style="{paddingLeft:'50px',paddingRight:'50px',paddingTop:'24',paddingBottom:'24px'}">
      <a-layout-sider width="200" style="background: #fff">
        <post-type></post-type>
      </a-layout-sider>

      <a-layout-content :style="{ background: '#fff',  marginLeft:'200px', minHeight: '280px' }">
        <student-rearch></student-rearch>
      </a-layout-content>
    </a-layout>
    <a-layout-content :style="{contentStyle,paddingLeft:'50px',paddingRight:'50px'}">
      <recommand-post-archor></recommand-post-archor>
    </a-layout-content>

    <a-layout-footer :style="footerStyle">更多岗位</a-layout-footer>
  </a-layout>
  </a-space>
</template>
<script lang="ts" setup>
import {type CSSProperties, ref} from 'vue';
import PostType from "@/router/student/homepage/postType.vue";
import StudentRearch from "@/router/student/homepage/StudentRearch.vue";
import RecommandPost from "@/router/student/homepage/RecommandPost.vue";
import RecommandPostArchor from "@/router/student/homepage/RecommandPostArchor.vue";
const selectedKeys1 = ref<string[]>(['2']);
ref<string[]>(['1']);

const contentStyle: CSSProperties = {
  textAlign: 'center',
  minHeight: '120px',
  lineHeight: '120px',
  color: '#fff',
  backgroundColor: '#108ee9',
};

const footerStyle: CSSProperties = {
  textAlign: 'center',
  color: '#fff',
  backgroundColor: '#7dbcea',
};
</script>
<style scoped>

</style>