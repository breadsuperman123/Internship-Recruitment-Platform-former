<template>
  <a-layout>
    <a-menu
        v-model:selectedKeys="selectedKeys1"
        theme="light"
        mode="horizontal"
        :style="{ lineHeight: '35px' }"
    >
      <a-menu-item @click="showNewPost" key="1">最新岗位</a-menu-item>
      <a-menu-item @click="showPopularPost" key="2">热门岗位</a-menu-item>
    </a-menu>
    <div>
      <NewPost v-if="selectedComponent === 'recommandNewPost'" />
      <PopularPost v-if="selectedComponent === 'recommandPopularPost'" />
    </div>
  </a-layout>
</template>

<script lang="ts" setup>
import {onMounted, ref} from 'vue';
import NewPost from '@/router/student/homepage/RecommandNewPost.vue'; // 导入你的 NewPost 组件
import PopularPost from '@/router/student/homepage/PopularPost.vue'; // 导入你的 PopularPost 组件

const selectedKeys1 = ref<string[]>(['1']);
const selectedComponent = ref<string>('newPost');
onMounted(showNewPost);

function showNewPost() {
  selectedComponent.value = 'recommandNewPost';
}

function showPopularPost() {
  selectedComponent.value = 'recommandPopularPost';
}
</script>

<style scoped>
/* 可以添加一些样式以调整导航栏和组件的布局 */
</style>
