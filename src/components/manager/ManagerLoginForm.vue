<template>
  <a-form
      :model="formState"
      name="basic"
      :label-col="{ span: 8 }"
      :wrapper-col="{ span: 16 }"
      autocomplete="off"
      @finish="onFinish"
      @finishFailed="onFinishFailed"
  >
    <a-form-item
        label="Username"
        name="username"
        :rules="[{ required: true, message: 'Please input your username!' }]"
    >
      <a-input v-model:value="formState.username" />
    </a-form-item>

    <a-form-item
        label="Password"
        name="password"
        :rules="[{ required: true, message: 'Please input your password!' }]"
    >
      <a-input-password v-model:value="formState.password" />
    </a-form-item>

    <a-form-item name="remember" :wrapper-col="{ offset: 8, span: 16 }">
      <a-checkbox v-model:checked="formState.remember">Remember me</a-checkbox>
    </a-form-item>

    <a-form-item :wrapper-col="{ offset: 8, span: 16 }">
      <a-button type="primary" html-type="submit">Submit</a-button>
    </a-form-item>
  </a-form>
</template>
<script lang="ts" setup>
import { reactive } from 'vue';
import axios from "axios";
import router from "@/router";

interface FormState {
  username: string;
  password: string;
  remember: boolean;
}

const formState = reactive<FormState>({
  username: '',
  password: '',
  remember: true,
});
const onFinish = async () => {
  try {
    const response = await axios.post(`http://localhost:8081/managerLogin`, {
      username: formState.username,
      password: formState.password
    });
    console.log('Success:', response.data);
    const responseCode = response.data.code;
    if(responseCode == 0){
      alert('Login failed. Please check your username and password.  responseCode: 0');
      return;
    }else if (responseCode == 1) { // 登录成功后的处理逻辑
      // 管理员登录成功后跳到管理员主页
      // 假设响应包含JWT令牌
      const token = response.data.data;

      // 将令牌保存到本地存储或状态管理系统中，以便在后续请求中使用
      localStorage.setItem('jwtToken', token);
      console.log("管理员登录页面存档的令牌",localStorage)
      return router.push('/managerHome');
    } else{
      alert('Login failed. Please check your username and password. responseCode: 1 else');
      return;
    }

  } catch (error) {
    console.error('Failed:', error);
    // 登录失败后的处理逻辑
    alert('Login failed. Please check your username and password. try catch error');
  }
};

const onFinishFailed = (errorInfo: any) => {
  console.log('Failed:', errorInfo);
};
</script>

