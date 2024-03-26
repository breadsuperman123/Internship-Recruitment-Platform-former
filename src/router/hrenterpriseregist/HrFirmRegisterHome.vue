<script setup lang="ts">
import { useRouter } from 'vue-router';

const router = useRouter();

const goToEnterpriseRegist = () => {
  return router.push('/enterpriseRegister');
};

const goToHrRegisterHome = () => {
  return router.push('/hrRegisterHome');
};
</script>

<template>
  <div class="container">
    <div class="button-container">
      <span>企业未入驻，点击下方按钮去申请</span>
      <el-button class="animated-button" @click="goToEnterpriseRegist">申请入驻</el-button>
    </div>

    <div class="button-container">
      <span>企业已入驻，点击下方按钮注册HR</span>
      <el-button class="animated-button" @click="goToHrRegisterHome">注册HR</el-button>
    </div>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background: linear-gradient(180deg, rgba(255,255,255,0) 0%, rgba(69,104,220,0.3) 50%, rgba(176,106,179,0.3) 100%);
}

.button-container {
  margin: 20px;
  text-align: center;
}

.animated-button {
  transition: transform 0.3s, box-shadow 0.3s;
}

.animated-button:hover {
  transform: translateY(-5px);
  box-shadow: 0 4px 20px rgba(0,0,0,0.3);
}

.el-button {
  border: none;
  color: white;
  background-color: #4568dc; /* Fallback for older browsers */
  background-image: linear-gradient(315deg, #4568dc 0%, #b06ab3 74%);
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  outline: none;
  border-radius: 5px;
  margin-top: 10px;
}
</style>
