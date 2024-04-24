<template>
  <a-form
      :model="formState"
      layout="horizontal"
      @finish="onFinish"
      @finishFailed="onFinishFailed"
      class="form-style"
  >
    <a-form-item
        label="Username"
        name="username"
        rules="[{
        required: true,
        message: 'Please input your username!',
        whitespace: true
      }]"
    >
      <a-input
          v-model:value="formState.username"
          placeholder="Enter your username"
          size="large"
          prefix-icon="user"
      />
    </a-form-item>

    <a-form-item
        label="Password"
        name="password"
        rules="[{
        required: true,
        message: 'Please input your password!'
      }]"
    >
      <a-input-password
          v-model:value="formState.password"
          placeholder="Enter your password"
          size="large"
          prefix-icon="lock"
      />
    </a-form-item>

    <a-form-item>
      <a-checkbox
          v-model:checked="formState.remember"
      >
        Remember me?
      </a-checkbox>
    </a-form-item>

    <a-form-item>
      <a-button
          type="primary"
          html-type="submit"
          size="large"
          class="submit-btn"
      >
        Submit
      </a-button>
      <a-button
          size="large"
          class="register-btn"
          @click="onRegister"
      >
        Register
      </a-button>
    </a-form-item>
  </a-form>
</template>

<script lang="ts" setup>
import { reactive, computed } from 'vue';
import { useRoute } from 'vue-router';
import axios from 'axios';
import router from '@/router';

interface FormState {
  username: string;
  password: string;
  remember: boolean;
}


const formState = reactive<FormState>({
  username: '',
  password: '',
  remember: false,
});
import {ref} from "vue"
const jwtToken = ref('')

const route = useRoute();

// 使用计算属性来动态获取loginType
const loginType = computed(() => {
  return route.path.includes('enterpriseLogin') ? 'enterprise' : 'student';
});

const hello = ref("")

const onFinish = async () => {
  const loginUrl = loginType.value === 'student' ? 'studentLogin' : 'enterpriseLogin';
  try {
    const response = await axios.post(`http://localhost:8081/${loginUrl}`, {
      username: formState.username,
      password: formState.password
    });
    console.log('Success:', response.data);
    const responseCode = response.data.code;
    if(responseCode == 0){
      alert('Login failed. Please check your username and password.  responseCode: 0');
      return;
    }else if (responseCode == 1 && loginType.value == 'student') { // 登录成功后的处理逻辑
      // 学生用户登录成功后跳转到学生用户界面/studentHome               // 判断获取当前是学生还是企业用户登入
      const token = response.data.data;

      // 将令牌保存到本地存储或状态管理系统中，以便在后续请求中使用
      localStorage.setItem('jwtToken', token);
      return router.push('/studentHome');
    } else if(responseCode == 1 && loginType.value == 'enterprise'){
      const token = response.data.data;

      // 将令牌保存到本地存储或状态管理系统中，以便在后续请求中使用
      localStorage.setItem('jwtToken', token);
      // 企业用户登录成功后跳转到企业用户界面/enterpriseHome
      return router.push('/humanResourceHome');
    }else{
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

const onRegister = () => {
  console.log('Register button clicked');
  if(loginType.value == 'student'){
    console.log('student register');
    return router.push("/studentRegisterView")
  }
  if(loginType.value == 'enterprise'){
    console.log('go to hr and firm register home');
    return router.push("/hrFirmRegisterHome")
  }
};
</script>


<style>
.form-style {
  max-width: 600px;
  margin: auto;
  padding: 24px;
  border-radius: 4px;
}

/* 调整表单标签的字体样式 */
.ant-form-item-label{
  font-weight: bold;
  font-size: 16px;
}

.ant-form-item-label label[title="Password"] {
  color: #121312;
}

.ant-form-item-label label[title="Username"] {
  color: #161817;
}


/* 调整"Remember me"复选框的字体样式 */
.ant-checkbox-wrapper {
  font-weight: bold;
  font-size: 16px;
  color: #131513; /* 根据需要调整颜色 */
}

.submit-btn, .register-btn {
  font-weight: bold;
  font-size: 16px;
}

.submit-btn {
  background-color: #fdf9f9;
  border-color: #00b2ff;
  color: #0a0a0a;
}

.register-btn {
  margin-left: 8px;
  color: #0f100f;
  border-color: #1890ff;
}


</style>
