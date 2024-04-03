<template>
  <div id="components-modal-demo-position">
    <a-button type="primary" @click="handleButtonClick">
      发布岗位
    </a-button>
    <a-modal
        style="width: 650px; "
        v-model:open="modalVisible"
        title="岗位信息"
        centered
        @ok="closeDetailDialog"
    >
      <insert-post-form :clickNumbers="clickNums"></insert-post-form>
    </a-modal>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import axios from "axios";
import InsertPostForm from "@/components/enterprise/function/post/InsertPostForm.vue";
// 设置axios请求头的通用配置
const clickNums = ref(1)

const modalVisible = ref<boolean>(false);
const jwtToken = localStorage.getItem("jwtToken");
axios.defaults.headers.common['token'] = jwtToken;

// 创建axios实例
const instance = axios.create({
  baseURL: 'http://localhost:8081'
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


const handleButtonClick = () => {
  modalVisible.value = true;
  clickNums.value = clickNums.value + 1;
};



const closeDetailDialog = () => {
  modalVisible.value = false;
};


</script>
