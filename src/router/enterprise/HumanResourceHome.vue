<template>
  <div style="display: flex; flex-direction: column; height: 100vh;">
    <div style="display: flex; justify-content: flex-end;">
      <hr-home-header  @click="toggleMenu" style="margin-right: 15px;"></hr-home-header>
    </div>
    <div style="height: 1px; background-color: #0e0d0d; margin-bottom: 15px;"></div>
    <div style="flex: 1; display: flex;">
      <div style="border-right: 1px solid #ccc; padding-right: 20px;">
        <hr-function-menu></hr-function-menu>
      </div>
      <div :style="contentStyle">

      </div>
    </div>
    <a-layout-footer :style="footerStyle">
      <h5>实习徒企业后台管理！</h5>
    </a-layout-footer>
  </div>
</template>

<script lang="ts" setup>
import type { CSSProperties } from 'vue';
import { ref } from 'vue'; // Import ref if not already imported
import EnterpriseMenu from "@/components/enterprise/HrFunctionMenu.vue";
import EnterpriseHeader from "@/components/enterprise/HrHomeHeader.vue";
import router from "@/router";
import HrHomeHeader from "@/components/enterprise/HrHomeHeader.vue";
import HrFunctionMenu from "@/components/enterprise/HrFunctionMenu.vue";

// Method to toggle menu visibility
const showMenu = ref(false);
const toggleMenu = () => {
  showMenu.value = !showMenu.value;
  return router.push("/enterpriseHome")
};

const headerStyle: CSSProperties = {
  textAlign: 'center',
  color: '#fff',
  height: '64px',
  paddingInline: '50px',
  lineHeight: '64px',
  backgroundColor: '#7966ef',
};

const contentStyle: CSSProperties = {
  textAlign: 'center',
  color: '#fff',
  backgroundColor: '#ffffff',
  width: '800px',
  flex: 1,
  display: 'flex',
  position: 'relative', // Add position relative for positioning the avatar
};

const footerStyle: CSSProperties = {
  textAlign: 'center',
  color: '#fff',
  height: '30px',
  lineHeight: '30px',
  backgroundColor: '#7dbcea',
};

</script>
