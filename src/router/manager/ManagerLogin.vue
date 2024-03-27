<script setup lang="ts">
import ManagerLoginForm from "../../components/manager/ManagerLoginForm.vue";
</script>

<template>
  <div class="page-container">
    <manager-login-form></manager-login-form>
  </div>
</template>

<style scoped>
.page-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: linear-gradient(135deg, #66eac7, rgba(191, 0, 255, 0.91));
}

manager-login-form {
  width: 100%;
  max-width: 400px; /* 设置最大宽度 */
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1); /* 添加阴影效果 */
  border-radius: 8px; /* 圆角边框 */
  overflow: hidden; /* 隐藏溢出内容 */
  background: white; /* 设置背景颜色 */
  padding: 20px; /* 内边距 */
  animation: appear 0.5s ease-in-out; /* 添加动画效果 */
}

@keyframes appear {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
