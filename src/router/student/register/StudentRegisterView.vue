<template>
  <a-space direction="vertical" :style="{ width: '100%' }" :size="[0, 48]">
    <a-layout>
      <a-layout-header :style="headerStyle">学生注册</a-layout-header>
      <a-layout-content :style="contentStyle">
        <student-register-form></student-register-form>
      </a-layout-content>
    </a-layout>
  </a-space>
</template>
<script lang="ts" setup>
import StudentRegisterForm from "@/router/student/register/StudentRegisterForm.vue";
import type { CSSProperties } from 'vue';
const headerStyle: CSSProperties = {
  textAlign: 'center',
  color: '#fff',
  height: 64,
  paddingInline: 50,
  lineHeight: '64px',
  backgroundColor: '#7dbcea',
};

const contentStyle: CSSProperties = {
  textAlign: 'center',
  minHeight: 120,
  lineHeight: '120px',
  color: '#fff',
  backgroundColor: '#108ee9',
};

</script>
