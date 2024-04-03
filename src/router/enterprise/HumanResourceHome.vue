<template>
  <div>
    <div class="header" style="background-color: #007bff">
      <hr-home-header @click="toggleMenu" style="margin-right: 15px;"></hr-home-header>
    </div>
    <div class="content-container">
      <div class="menu-container">
        <hr-function-menu @menuSelected="handleMenuSelected"></hr-function-menu>
      </div>
      <div class="main-content">
        <div v-show="isMenu1" class="post-management-container">
          <post-management :clickNumbers="currentMenuKey" :clickMenuOnes="clickMenuOneNums"></post-management>
        </div>
        <div v-if="isMenu21" class="content">
          <resume-approval-management></resume-approval-management>
        </div>
        <div v-else-if="isMenu22" class="content">
          <resume-submit-management></resume-submit-management>
        </div>
        <div v-else-if="isMenu3" class="content">
          <chat-home class="chat-home-fixed"></chat-home>
        </div>
        <div v-else-if="isMenu41" class="content">
          Menu 4.1 Content
        </div>
        <div v-else-if="isDefault" class="content">
          <post-management :clickNumbers="currentMenuKey"></post-management>
        </div>
      </div>
    </div>
    <a-layout-footer :style="footerStyle">
      <h5>实习徒企业后台管理！</h5>
    </a-layout-footer>
  </div>
</template>

<script setup lang="ts">
import type { CSSProperties } from 'vue';
import { ref, computed } from 'vue';
import { onMounted } from 'vue';
import router from "@/router";
import HrHomeHeader from "@/components/enterprise/HrHomeHeader.vue";
import HrFunctionMenu from "@/components/enterprise/HrFunctionMenu.vue";
import PostManagement from "@/components/enterprise/function/PostManagement.vue";
import ResumeSubmitManagement from "@/components/enterprise/function/ResumeSubmitManagement.vue";
import ResumeApprovalManagement from "@/components/enterprise/function/ResumeApprovalManagement.vue";
import ChatHome from "@/components/enterprise/function/chat/ChatHome.vue";

const showMenu = ref(false);
const currentMenuKey = ref('');
const toggleMenu = () => {
  showMenu.value = !showMenu.value;
  return router.push("/enterpriseHome");
};
const clickMenuOneNums = ref(1)
const handleMenuSelected = (selectedItem: any) => {
  currentMenuKey.value = selectedItem.key;
  if(currentMenuKey.value == "1"){
    clickMenuOneNums.value = clickMenuOneNums.value + 1;
  }
};

const isMenu1 = computed(() => currentMenuKey.value == '1');
const isMenu21 = computed(() => currentMenuKey.value == '2.1');
const isMenu22 = computed(() => currentMenuKey.value == '2.2');
const isMenu3 = computed(() => currentMenuKey.value == '3');
const isMenu41 = computed(() => currentMenuKey.value == '4.1');
const isDefault = computed(() => !isMenu1.value && !isMenu21.value && !isMenu22.value && !isMenu3.value && !isMenu41.value);

const footerStyle: CSSProperties = {
  position: 'fixed',
  bottom: '0',
  left: '0',
  right: '0',
  textAlign: 'center',
  color: '#fff',
  height: '30px',
  lineHeight: '30px',
  backgroundColor: '#7dbcea',
  zIndex: '1000',
};

</script>

<style scoped>
.header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: flex-end;
  border-bottom: 1px solid #0a0a0a;
  background-color: #ffffff;
  z-index: 1000;
}

.content-container {
  display: flex;
  margin-top: 64px;
}

.menu-container {
  position: fixed;
  top: 64px;
  bottom: 30px; /* Adjusted to include space for footer */
  left: 0;
  width: 300px; /* Adjust the width as needed */
  border-right: 1px solid #ccc;
  padding-right: 20px;
  overflow-y: auto;
}
.chat-home-fixed{
  position: fixed;
  top: 72px;
  left: 365px;
  //justify-content: center;
  //align-items: center;
  //margin-top: 320px;

  //padding-top: 150px;
}
.main-content {
  margin-left: 200px; /* Adjust margin to match menu width */
  flex: 1;
  display: flex;
  flex-direction: column;
}

.post-management-container {
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
}

.content {
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
}
</style>
