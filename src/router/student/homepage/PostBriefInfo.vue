<script setup lang="ts">
import { defineProps } from 'vue';

const props = defineProps({
  post: {
    type: Object,
    required: true
  }
});

</script>

<template>
  <a-card style="width: 1340px; height: 500px">
    <template #title>
      <p style="font-size: 60px">{{ post.name }}</p> <!-- 显示岗位名称 -->
    </template>
    <p>
      <a-breadcrumb>
        <a-breadcrumb-item style="font-size: 20px;color: #0a0a0a">薪资: {{ post.pay }}</a-breadcrumb-item> <!-- 显示薪资 -->
        <a-breadcrumb-item style="font-size: 20px;color: #0a0a0a">地点: {{ post.workCity }}</a-breadcrumb-item> <!-- 显示地点 -->
        <a-breadcrumb-item style="font-size: 20px;color: #0a0a0a">实习月份: {{ post.month }}</a-breadcrumb-item> <!-- 显示实习月份 -->
      </a-breadcrumb>
    </p>
    <a-button-group>
      <a-button>投递简历</a-button>
    </a-button-group>
  </a-card>
</template>

<style scoped>
</style>
