<template>
  <div id="components-modal-demo-position">
    <a-button type="primary" @click="showDetailDialog">
      编辑
    </a-button>
    <a-modal
        style="width: 650px; "
        v-model:open="modalVisible"
        title="岗位信息"
        centered
        @ok="closeDetailDialog"
    >
      <post-detail-form ></post-detail-form>
    </a-modal>
  </div>
</template>

<script lang="ts" setup>
import { ref, defineProps } from 'vue';
import axios from "axios";
import PostDetailForm from "@/components/enterprise/function/post/PostDetailForm.vue";
// 设置axios请求头的通用配置

const props = defineProps({
  id: Number
});

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

const enterpriseData = ref({
  id: '',
  name: '',
  address: '',
  description: '',
  logoUrl: '',
  creditCode: '',
});

const showDetailDialog = async () => {
  modalVisible.value = true;
  console.log("jwt:", jwtToken);
  try {
    const response = await instance.post("/enterpriseDetail", {
      id: props.id
    });
    enterpriseData.value = response.data.data;
  } catch (error) {
    console.error("Error fetching enterprise detail:", error);
  }
};

const closeDetailDialog = () => {
  modalVisible.value = false;
};
</script>
