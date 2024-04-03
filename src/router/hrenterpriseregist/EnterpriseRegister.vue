<script setup lang="ts">
import { ref } from 'vue';
import axios from 'axios';
import { message } from 'ant-design-vue'; // Import message from ant-design-vue
const company = ref('');
const creditCode = ref('');
const address = ref('');
const intro = ref('');
const file = ref(null);
const logoUrl = ref('');

const submitRegistration = async () => {
  if (!company.value || !creditCode.value || !address.value || !intro.value || !file.value) {
    alert('所有字段都需要填写。');
    return;
  }
  // formData.append('file', file.value); // Ensure file is added to FormData

  try {
    const response1 = await axios.post('http://localhost:8081/upload', {
      file: file.value
    }, {
      headers: {
        'Content-Type': 'multipart/form-data' // Ensure correct Content-Type header
      }
    });
    logoUrl.value = response1.data.data;

    const response2 = await axios.post('http://localhost:8081/enterpriseRegister', {
      name:company.value,
      creditCode:creditCode.value,
      address:address.value,
      description:intro.value,
      logoUrl: logoUrl.value
    });

    console.log("公司名称：", company.value)
    console.log("信用代码：", creditCode.value)
    console.log("地址：", address.value)
    console.log("公司简介：", intro.value)
    console.log("文件logoUrl：", logoUrl.value)
    console.log(response2.data);
    if(response2.data.code == 1){
      message.success(response2.data.data)
      return;
    }else{
      message.error(response2.data.data)
    }
  } catch (error) {
    console.error(error);
  }
};
</script>
>

<template>
  <div class="container">
    <form @submit.prevent="submitRegistration" class="registration-form">
      <h2>企业注册</h2>
      <input v-model="company" type="text" placeholder="公司名称" />
      <input v-model="creditCode" type="text" placeholder="信用代码" />
      <input v-model="address" type="text" placeholder="地址" />
      <textarea v-model="intro" placeholder="简介"></textarea>
      <label for="file-upload" class="custom-file-upload">
        <i class="fa fa-cloud-upload"></i> 营业执照
      </label>
      <input id="file-upload" type="file" @change="file = $event.target.files[0]" accept="*.*" />
      <button type="submit" style="color: #007bff">提交注册</button>
    </form>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f4f4f4;
}

.registration-form {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 400px;
  padding: 20px;
  border-radius: 10px;
  background-color: #fff;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
}

input, textarea, button {
  margin-bottom: 10px;
  padding: 10px;
  width: 100%;
  border-radius: 5px;
  border: 1px solid #ddd;
  outline: none;
}

button {
  background-color: #2982dc;
  color: white;
  cursor: pointer;
  transition: background-color 0.3s;
}

button:hover {
  background-color: #0957a4;
}

.custom-file-upload {
  border: 1px solid #ccc;
  display: inline-block;
  padding: 6px 12px;
  cursor: pointer;
}
</style>
