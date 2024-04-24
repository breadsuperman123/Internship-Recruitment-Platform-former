<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import PostInfo from "@/router/student/homepage/PostInfo.vue";
import axios from "axios";
import {useRoute} from "vue-router";

// 定义岗位信息变量
const jobPosts = ref([]);

// 从后端获取岗位信息

const fetchJobPosts = async () => {
  try{
  const response1 = await axios.get("http://localhost:8081/recommandNew");
  if (response1.status === 200) {
    jobPosts.value = response1.data;
  } else {
    console.error('Failed to fetch job posts:', response1 .status);
  }
} catch (error) {
  console.error('Error fetching job posts:', error);
}
};

// 组件挂载时获取岗位信息
onMounted(() => {
  fetchJobPosts();
});

// 计算每列应该显示的岗位信息
const postsPerColumn = 9; // 每列显示的岗位信息数量
const columns = ref([]); // 列数组

// 根据岗位信息重新计算列数组
const computeColumns = () => {
  columns.value = [];
  for (let i = 0; i < jobPosts.value.length; i += postsPerColumn) {
    columns.value.push(jobPosts.value.slice(i, i + postsPerColumn));
  }
};

// 监听岗位信息变化，重新计算列数组
watch(jobPosts, computeColumns);
</script>

<template>
  <a-row :gutter="[16, 24]" justify="center">
    <!-- 使用循环渲染列 -->
    <a-col v-for="(column, index) in columns" :key="index" class="gutter-row" :span="6">
      <!-- 在每个列中循环渲染岗位信息 -->
      <postInfo v-for="post in column" :key="post.id" :post="post" />
    </a-col>
  </a-row>
</template>

<style scoped>
.gutter-box {
  background: #0092ff;
  padding: 8px 0;
}
</style>
