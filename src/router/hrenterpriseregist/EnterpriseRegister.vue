<script setup lang="ts">
import { ref } from 'vue';
import axios from 'axios';

const company = ref('');
const creditCode = ref('');
const address = ref('');
const intro = ref('');

const submitRegistration = async () => {
  // 检查所有字段是否已填写
  if (!company.value || !creditCode.value || !address.value || !intro.value) {
    alert('所有字段都需要填写。');
    return;
  }
  try {
    const response = await axios.post('http://localhost:8081/enterpriseRegister', {
      name: company.value,
      creditCode: creditCode.value,
      address: address.value,
      description: intro.value
    });
    console.log("公司名称：", company.value)
    console.log("信用代码：", creditCode.value)
    console.log("地址：", address.value)
    console.log("公司简介：", intro.value)
    console.log(response.data);
    if(response.data.code == 1){
      alert(response.data.data)
      return;
    }else{
      alert(response.data.data)
    }
    // 处理响应数据
  } catch (error) {
    console.error(error);
    // 处理错误
  }
};
</script>

<template>
  <div class="container">
    <form @submit.prevent="submitRegistration" class="registration-form">
      <h2>企业注册</h2>
      <input v-model="company" type="text" placeholder="公司名称" />
      <input v-model="creditCode" type="text" placeholder="信用代码" />
      <input v-model="address" type="text" placeholder="地址" />
      <textarea v-model="intro" placeholder="简介"></textarea>
      <button type="submit">提交</button>
    </form>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab);
  background-size: 400% 400%;
  animation: gradientBG 15s ease infinite;
}

.registration-form {
  display: flex;
  flex-direction: column;
  width: 300px;
  gap: 10px;
}

input, textarea {
  padding: 10px;
  border-radius: 5px;
  border: none;
  outline: none;
}

button {
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  background-color: #23a6d5;
  color: white;
  cursor: pointer;
  transition: background-color 0.3s;
}

button:hover {
  background-color: #23d5ab;
}

@keyframes gradientBG {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}
</style>
