<script setup lang="ts">
import {defineProps, onMounted, ref} from 'vue';
import axios from "axios";
import StudentPrimPage from "@/router/student/homepage/StudentPrimPage.vue";
import StudentLocalResume from "@/router/student/homepage/StudentLocalResume.vue";

const props = defineProps({
  post: {
    type: Object,
    required: true
  }
});

const jwtToken = localStorage.getItem("jwtToken")
const instance = axios.create({
  baseURL: 'http://localhost:8081',
  withCredentials: false,
});
// 添加请求拦截器
instance.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  config.headers.Authorization = `${jwtToken}`;
  return config;
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error);
});

onMounted(() => {
  checkSubmission();
});
const isSubmitted = ref(false);

const checkSubmission=async ()=>{
  const response = await instance.post("/submitResume",{postId: props.post.id});
  if (response.data.code === 1 && response.data.msg === 'success'){
    isSubmitted.value = true; // 更新按钮状态为已投递
  }
}


</script>

<template>
  <a-card style="width: 1340px; height: 500px">
    <template #title>
      <p style="font-size: 60px">{{ post.name }}</p> <!-- 显示岗位名称 -->
    </template>
    <p>
      <a-breadcrumb>
        <a-breadcrumb-item style="font-size: 20px;color: #0a0a0a">薪资: {{ post.pay }}</a-breadcrumb-item> <!-- 显示薪资 -->
        <a-breadcrumb-item style="font-size: 20px;color: #0a0a0a">地点: {{ post.workCity }}</a-breadcrumb-item> <!-- 显示地点 -->
        <a-breadcrumb-item style="font-size: 20px;color: #0a0a0a">实习月份: {{ post.month }}</a-breadcrumb-item> <!-- 显示实习月份 -->
      </a-breadcrumb>
    </p>
    <a-button-group>
      <a-dropdown placement="bottomLeft" v-if="!isSubmitted">
        <a-button size="large" :disabled="isSubmitted">
          {{ isSubmitted ? '已投递' : '投递简历' }}
        </a-button>
        <template v-slot:overlay>
          <a-menu style="width: 350px">
            <student-local-resume :postId="post.id"></student-local-resume>
          </a-menu>
        </template>
      </a-dropdown>
      <a-button size="large" v-else disabled>已投递</a-button><!--跳转聊天 -->
    </a-button-group>
      <a-button size="large">沟通职位</a-button><!--跳转聊天 -->
  </a-card>
</template>

<style scoped>

</style>
