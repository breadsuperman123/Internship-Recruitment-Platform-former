<script setup lang="ts">
import { reactive } from 'vue';
import axios from 'axios';


const form = reactive({
  name: '',
  username: '',
  sex: '',
  birthday: '',
  phone: '',
  password: '',
  email: '',
});

const onSubmit = async () => {
  try {
    const response = await axios.post('http://localhost:8081/studentRegisterView', {
      name: form.name,
      username: form.username,
      sex: form.sex,
      birthday: form.birthday,
      phone: form.phone,
      password: form.password,

    });
    console.log("学生姓名：", form.name)
    console.log("用户名：", form.username)
    console.log("性别：", form.sex)
    console.log("手机号：", form.phone)
    console.log("电子邮箱：", form.email)
    console.log("密码：", form.password)
    console.log(response.data);
    // 处理响应数据
  } catch (error) {
    console.error(error);
    // 处理错误
  }
};
</script>


<template>
  <el-form :model="form" label-width="auto" style="max-width: 600px">
    <el-form-item label="Activity name">
      <el-input v-model="form.name" />
    </el-form-item>
    <el-form-item label="Activity username">
      <el-input v-model="form.username" placeholder="请输入您的用户名">
      </el-input>
    </el-form-item>

    <el-form-item label="Activity sex">
      <el-select v-model="form.sex" placeholder="请选择您的性别">
        <el-option label="男" value="男" />
        <el-option label="女" value="女" />
      </el-select>
    </el-form-item>

    <el-form-item label="Activity time">
      <el-col :span="12">
        <el-date-picker
            v-model="form.birthday"
            type="date"
            placeholder="请选择您的出生日期"
            style="width: 100%"
        />
      </el-col>
    </el-form-item>

    <el-form-item label="Activity phone">
      <el-input v-model="form.phone" placeholder="请输入您的电话号码">
      </el-input>
    </el-form-item>

    <el-form-item label="Activity email">
      <el-input v-model="form.email" placeholder="请输入您的电子邮箱">
      </el-input>
    </el-form-item>

    <el-form-item label="Activity password">
      <el-input v-model="form.password"  type="password"
        placeholder="请输入您的密码"
        show-password
      />
    </el-form-item>

    <el-form-item>
      <el-button type="primary" @click="onSubmit">Create</el-button>
      <el-button>Cancel</el-button>
    </el-form-item>
  </el-form>
</template>

<style scoped>

</style>