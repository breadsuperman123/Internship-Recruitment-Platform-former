<script setup lang="ts">
import {CSSProperties} from "vue";

const contentStyle: CSSProperties = {
  textAlign: 'center',
  minHeight: 120,
  lineHeight: '120px',
  color: '#fff',
  backgroundColor: '#108ee9',
};

const siderStyle: CSSProperties = {
  textAlign: 'center',
  lineHeight: '120px',
  color: '#fff',
  backgroundColor: '#3ba0e9',
};
</script>

<template>
  <a-layout>
    <a-layout>
      <a-layout-content :style="contentStyle">岗位jd</a-layout-content>
      <a-layout-sider :style="siderStyle">公司信息</a-layout-sider>
    </a-layout>
  </a-layout>
</template>

<style scoped>

</style>