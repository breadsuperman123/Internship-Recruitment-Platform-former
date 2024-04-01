<template>
  <a-space direction="vertical" :style="{ width: '100%' }" :size="[0, 48]">
    <a-layout>
      <a-layout-content :style="contentStyle">
        <div class="form-container">
          <student-register-form></student-register-form>
        </div>
      </a-layout-content>
    </a-layout>
  </a-space>
</template>

<script lang="ts" setup>
import type { CSSProperties } from 'vue';
import StudentRegisterForm from "@/router/student/register/StudentRegisterForm.vue";


const contentStyle: CSSProperties = {
  textAlign: 'center',
  minHeight: '100vh', // 修改最小高度为80vh，使studentregisterform组件占界面比例更大
  lineHeight: '120px',
  color: '#fff',
  background: 'url(/实习徒注册背景.gif)', // 添加动态背景
  backgroundSize: 'cover', // 确保背景图像覆盖整个元素
};

</script>

<style scoped>
.form-container {
  max-width: 800px;
  margin: 0 auto;
}
</style>
