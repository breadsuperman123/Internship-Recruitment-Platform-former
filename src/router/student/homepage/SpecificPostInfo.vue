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
    <a-layout-content style="ding: 0 50px">
      <div class="post-container">
        <!-- 岗位简介+投递接口 -->
        <post-brief-info class="post-component" :post="jobPosts" style="margin-top:30px ;margin-bottom: 20px;margin-right: 70px;margin-left:70px"></post-brief-info>
        <!-- 岗位jd+公司简介+职位亮点 -->
        <post-point class="post-component" :post="jobPosts" style="padding-left: 75px;padding-right: 75px" ></post-point>
      </div>
    </a-layout-content>
    <a-layout-footer style="text-align: center">
      若有不真实信息，请拨打举报热线
    </a-layout-footer>
  </a-layout>
</template>


<script lang="ts" setup>
import {ref} from 'vue';
import PostBriefInfo from "@/router/student/homepage/PostBriefInfo.vue";
import PostPoint from "@/router/student/homepage/PostPoint.vue";
import {useRoute} from "vue-router";
const selectedKeys = ref<string[]>(['2']);
// 从路由中获取参数
const route = useRoute();
const jobPosts = ref([]);
jobPosts.value = JSON.parse(route.params.postData)[0]; // 只取数组中的第一个岗位信息
console.log(route.params.postData)
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
