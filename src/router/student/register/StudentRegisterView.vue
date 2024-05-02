<template>
  <a-space direction="vertical" :style="{ width: '100%' }" :size="[0, 48]">
    <a-layout>
      <a-layout-content :style="{ position: 'relative', zIndex: 1 }">
        <student-register-form class="form-container"></student-register-form>
      </a-layout-content>
      <video class="background-video" autoplay loop muted>
        <source src="/注册界面背景.mp4" type="video/mp4">
      </video>
    </a-layout>
  </a-space>
</template>

<script lang="ts" setup>
import type { CSSProperties } from 'vue';
import StudentRegisterForm from "@/router/student/register/StudentRegisterForm.vue";
</script>

<style scoped>
.background-video {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover; /* 确保视频填充整个容器并保持宽高比例 */
  z-index: 0; /* 确保视频位于布局内容之后 */
}
.form-container {
  background: transparent;
  margin-right: 680px;
  color: white;
}
</style>
