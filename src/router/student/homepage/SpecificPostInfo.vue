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
        <a-menu-item key="1">导航1</a-menu-item>
        <a-menu-item key="2">导航2</a-menu-item>
        <a-menu-item key="3">导航3</a-menu-item>
      </a-menu>
    </a-layout-header>
    <a-layout-content style="padding: 0 50px">
      <div class="post-container">
        <!-- 岗位简介+投递接口 -->
        <post-brief-info class="post-component" style="margin-top:30px ;margin-bottom: 20px"></post-brief-info>
        <!-- 岗位jd+公司简介+职位亮点 -->
        <post-point class="post-component"></post-point>
      </div>
    </a-layout-content>
    <a-layout-footer style="text-align: center">
      若有不真实信息，请拨打举报热线
    </a-layout-footer>
  </a-layout>
</template>


<script lang="ts" setup>
import { ref } from 'vue';
import PostBriefInfo from "@/router/student/homepage/PostBriefInfo.vue";
import PostPoint from "@/router/student/homepage/PostPoint.vue";
const selectedKeys = ref<string[]>(['2']);
</script>
<style scoped>
.post-container {
  display: flex;
  flex-direction: column;
}

.post-component {
  flex: 1;
}

</style>
