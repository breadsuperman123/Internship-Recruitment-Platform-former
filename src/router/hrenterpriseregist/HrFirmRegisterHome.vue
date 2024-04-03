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
    <div class="title">欢迎使用企业注册平台</div>

    <div class="button-container">
      <span class="instruction">如果您是新企业，请点击下方按钮进行入驻申请。</span>
      <el-button class="primary-button" @click="goToEnterpriseRegist">申请入驻</el-button>
    </div>

    <div class="button-container">
      <span class="instruction">如果您是已入驻企业，欢迎注册 HR 账号。</span>
      <el-button class="secondary-button" @click="goToHrRegisterHome">注册 HR</el-button>
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
  background-color: #f9f9f9;
  padding: 40px;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.title {
  font-size: 32px;
  font-weight: bold;
  margin-bottom: 40px;
  text-align: center;
  color: #333;
}

.instruction {
  font-size: 18px;
  margin-bottom: 20px;
  color: #666;
  text-align: center;
}

.button-container {
  margin-bottom: 30px;
}

.primary-button {
  background-color: #3557dc;
  color: #fff;
  padding: 14px 28px;
  font-size: 18px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.3s, box-shadow 0.3s;
}

.secondary-button {
  background-color: #fff;
  color: #335fce;
  border: 2px solid #3459d2;
  padding: 14px 28px;
  font-size: 18px;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s, color 0.3s, transform 0.3s, box-shadow 0.3s;
}

.primary-button:hover {
  background-color: #2a7bd9;
  transform: translateY(-3px);
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
}

.secondary-button:hover {
  background-color: #e8f5e9;
  color: #1f56ce;
  transform: translateY(-3px);
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
}
</style>
