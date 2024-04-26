<script setup lang="ts">
import { reactive } from 'vue';
import axios from 'axios';
import { ElMessage } from 'element-plus';
import router from "@/router"; // 确保引入了 Element Plus 的 ElMessage 消息框组件

const form = reactive({
  name: '',
  username: '',
  sex: '',
  birthday: '',
  phone: '',
  password: '',
  email: '',
  code: '',
});

const onSubmit = async () => {
  try {
    const response = await axios.post('http://localhost:8081/studentRegisterView', {
      name: form.name,
      username: form.username,
      sex: form.sex,
      phone: form.phone,
      password: form.password,
      code: form.code
    });

    // 从后端返回的数据中提取消息内容

    // 根据后端返回的数据显示消息框
    if (response.data.code === 1 && response.data.msg === 'success') {
      ElMessage.success(response.data.data); // 显示成功消息
      await router.push({name: 'studentLogin'});
    } else {
      ElMessage.error(response.data.data); // 显示失败消息
    }
  } catch (error) {
    console.error(error);
    ElMessage.error('请求出错，请稍后再试'); // 显示请求出错消息
  }
};

const sendCode = async () => {
  try {
    await axios.post('http://localhost:8081/sendCode', {
      phoneNumber: form.phone,
    });
    console.log("验证码已发送");
    console.log("手机号：", form.phone);
  } catch (error) {
    console.error(error);
    ElMessage.error('发送验证码失败'); // 显示发送验证码失败消息
  }
};
</script>



<template>
  <div class="container">
    <el-form :model="form" label-width="auto" style="max-width: 600px" class="my-form">
      <el-form-item label="姓名">
        <el-input v-model="form.name" />
      </el-form-item>
      <el-form-item label="用户名">
        <el-input v-model="form.username" placeholder="请输入您的用户名">
        </el-input>
      </el-form-item>

      <el-form-item label="性别">
        <el-select v-model="form.sex" placeholder="请选择您的性别">
          <el-option label="男" value="男" />
          <el-option label="女" value="女" />
        </el-select>
      </el-form-item>

      <el-form-item label="电话号码">
        <el-input v-model="form.phone" placeholder="请输入您的电话号码"></el-input>
        <el-form-item label="验证码">
          <el-input v-model="form.code" placeholder="请输入验证码"></el-input>
        </el-form-item>
        <el-button @click="sendCode">发送验证码</el-button>
      </el-form-item>

      <el-form-item label="设置密码">
        <el-input v-model="form.password"  type="password"
                  placeholder="请输入您的密码"
                  show-password
        />
      </el-form-item>
      <el-row type="flex" justify="center">
      <el-form-item>
        <el-button type="primary" @click="onSubmit">创建</el-button>
        <el-button>取消</el-button>
      </el-form-item>
      </el-row>

    </el-form>

  </div>
</template>

<style scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
}

.my-form {
  max-width: 800px;
  /* 根据需要添加更多样式 */
  background-color: transparent; /* 设置背景颜色为透明 */
  color: black; /* 设置文本颜色为黑色 */
  font-size: 2em; /* 设置字体大小为2em，使整个表单看起来更大 */
}



</style>

