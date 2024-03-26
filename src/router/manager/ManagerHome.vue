<template>
  <div style="display: flex; flex-direction: column; height: 100vh;">
    <a-layout-header :style="headerStyle">Header</a-layout-header>
    <div style="flex: 1; display: flex;">
      <a-layout-sider :style="siderStyle">Sider</a-layout-sider>
      <a-layout-content :style="{ ...contentStyle, flex: 1 }">Content</a-layout-content>
    </div>
    <a-layout-footer :style="footerStyle">
<!--      <button-test></button-test>-->
    </a-layout-footer>
  </div>
</template>

<script lang="ts" setup>
import type { CSSProperties } from 'vue';
// import ButtonTest from '../../components/button/ButtonTest.vue';

const headerStyle: CSSProperties = {
  textAlign: 'center',
  color: '#fff',
  height: '64px',
  paddingInline: '50px',
  lineHeight: '64px',
  backgroundColor: '#a7e7cb',
};

const siderStyle: CSSProperties = {
  width: '200px',
  textAlign: 'center',
  lineHeight: '120px',
  color: '#fff',
  backgroundColor: '#3ba0e9',
};

const contentStyle: CSSProperties = {
  textAlign: 'center',
  color: '#fff',
  backgroundColor: '#108ee9',
};

const footerStyle: CSSProperties = {
  textAlign: 'center',
  color: '#fff',
  height: '30px',
  lineHeight: '30px',
  backgroundColor: '#7dbcea',
};
</script>
