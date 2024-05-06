<template>
  <a-row :gutter="[16, 24]" justify="center">
    <!-- 使用循环渲染列 -->
    <a-col v-for="(column, index) in columns" :key="index" class="gutter-row" :span="12">
      <!-- 在每个列中循环渲染岗位信息 -->
      <a-row :gutter="[16, 24]">
        <a-col v-for="post in column" :key="post.id" :span="24 / columns.length">
          <post-info :post="post" />
        </a-col>
      </a-row>
    </a-col>
  </a-row>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import PostInfo from '@/router/student/homepage/PostInfo.vue';
import StudentFilter from "@/router/student/homepage/StudentFilter.vue";

const route = useRoute();
const jobPosts = ref([]);

// 当 searchData 存在时才解析
if (route.params.searchData) {
  jobPosts.value = JSON.parse(route.params.searchData);
  console.log("公司所有岗位信息：",jobPosts)
}
const postsPerColumn = 90;
const columns = ref([]);

const computeColumns = () => {
  columns.value = [];
  for (let i = 0; i < jobPosts.value.length; i += postsPerColumn) {
    columns.value.push(jobPosts.value.slice(i, i + postsPerColumn));
  }
};

watch(jobPosts, computeColumns);
onMounted(computeColumns);

// 监听路由参数的变化
watch(() => route.params.searchData, (newSearchData) => {
  if (newSearchData) {
    jobPosts.value = JSON.parse(newSearchData);
  }
});
</script>

<style scoped>
.gutter-row {
  margin-bottom: 16px;
}
</style>
