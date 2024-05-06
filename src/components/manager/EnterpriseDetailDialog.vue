<template>
  <div id="components-modal-demo-position">
    <a-button type="primary" @click="showDetailDialog">
      {{ id }}
    </a-button>
    <a-modal
        v-model:open="modalVisible"
        title="企业详细信息"
        centered
        @ok="closeDetailDialog"
    >
      <p>企业ID：{{ enterpriseData.id }}</p>
      <p>企业名称：{{ enterpriseData.name }}</p>
      <p>企业地址：{{ enterpriseData.address }}</p>
      <p>社会信用代码{{ enterpriseData.creditCode }}</p>
      <p>企业简介{{ enterpriseData.description }}</p>
      <p>图片url{{ enterpriseData.logoUrl }}</p>
    </a-modal>
  </div>
</template>

<script lang="ts" setup>
import { ref, defineProps } from 'vue';
import axios from "axios";
// 设置axios请求头的通用配置

const props = defineProps({
  id: Number
});

const modalVisible = ref<boolean>(false);
const jwtToken = localStorage.getItem("jwtToken");
axios.defaults.headers.common['token'] = jwtToken;

import instance from "@/axios-instance";

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
