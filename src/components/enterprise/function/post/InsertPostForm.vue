<template>
  <!--  <a-checkbox :checked="componentDisabled" @change="e => (componentDisabled = e.target.checked)">-->
  <!--    Form disabled-->
  <!--  </a-checkbox>-->
  <a-form
      :label-col="labelCol"
      :wrapper-col="wrapperCol"
      layout="horizontal"
      :disabled="componentDisabled"
      style="max-width: 1000px"
  >
    <a-form-item label="岗位名称">
      <a-input v-model:value="name"/>
    </a-form-item>
    <a-form-item label="岗位类别">
      <a-select v-model:value="postSmallTypeName">
        <a-select-option v-for="category in jobCategories" :key="category" :value="category">
          {{ category }}
        </a-select-option>
      </a-select>
    </a-form-item>
    <a-form-item label="投递截止日期">
      <a-date-picker v-model:value="deliveryDeadline"/>
    </a-form-item>
    <a-form-item label="工作城市">
      <a-input v-model:value="workCity"/>
    </a-form-item>
    <a-form-item label="工作地点">
      <a-input v-model:value="workPlace"/>
    </a-form-item>
    <a-form-item label="薪资">
      <a-input-number v-model:value="pay"/>
      <span>元/天</span>
    </a-form-item>
    <a-form-item label="最少实习时间">
      <a-input-number v-model:value="minInternship"/>
      <span>月</span>
    </a-form-item>
    <a-form-item label="岗位状态">
      <a-select v-model:value="status">
        <a-select-option value="read">招聘中</a-select-option>
        <a-select-option value="initial_screening">停止招聘</a-select-option>
      </a-select>
    </a-form-item>
    <a-form-item label="岗位介绍">
      <a-textarea v-model:value="description" :rows="5"/>
    </a-form-item>
    <a-form-item label="岗位要求">
      <a-textarea v-model:value="demand" :rows="5"/>
    </a-form-item>
    <a-form-item style="text-align: center;">
      <a-button @click="addPost" type="primary">提交发布</a-button>
    </a-form-item>
  </a-form>
</template>

<script lang="ts" setup>
import {ref, onMounted, defineProps, watch} from 'vue';

import axios from 'axios';
import { message } from 'ant-design-vue'; // Import message from ant-design-vue


// 定义 name 属性
const name = ref('');

// 定义 postSmallType.name 属性
const postSmallTypeName = ref('');

// 定义 deliveryDeadline 属性
const deliveryDeadline = ref('');

// 定义 workCity 属性
const workCity = ref('');

// 定义 workPlace 属性
const workPlace = ref('');

// 定义 pay 属性
const pay = ref('');

// 定义 minInternship 属性
const minInternship = ref('');

// 定义 status 属性
const status = ref('');

// 定义 description 属性
const description = ref('');

// 定义 demand 属性
const demand = ref('');


const jobCategories = ref([]);

const token = localStorage.getItem('jwtToken');
const componentDisabled = ref(false);
const labelCol = {style: {width: '150px'}};
const wrapperCol = {span: 20};


// 创建axios实例
const instance = axios.create({
  baseURL: 'http://localhost:8081',
  withCredentials: false,
});

// 添加请求拦截器
instance.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  config.headers.Authorization = `${token}`;
  return config;
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error);
});


const getPostSmallType = async () => {
  try {
    // 获取所有岗位类别
    const response = await instance.post("/getPostSmallType");
    console.log(response.data.data)
    jobCategories.value = response.data.data; // 将岗位类别显示在下拉选择框
  } catch (e) {
    alert("岗位获取失败，出现异常！");
  }
};

onMounted(() => {
  getPostSmallType();
});

// 定义接收的事件
const props = defineProps({
  clickNumbers: Number
});

// 使用watch监听props.clickNumbers的变化
watch(() => props.clickNumbers, (newVal: any, oldVal: any) => {
  // 当clickNumbers改变时，调用getPostSmallType
  if (newVal != oldVal) {
    getPostSmallType();
  }
});

const addPost = async () => {
  //
  try {
    // 在发送请求之前输出表单信息
    console.log("表单信息：", {
      name: name.value,
      postSmallTypeName: postSmallTypeName.value,
      deliveryDeadline: deliveryDeadline.value,
      workCity: workCity.value,
      workPlace: workPlace.value,
      pay: pay.value,
      minInternship: minInternship.value,
      status: status.value,
      description: description.value,
      demand: demand.value
    });
    // 获取所有岗位类别
    const response1 = await instance.post("/getPostSmallType")
    jobCategories.value = response1.data.data;// 将岗位类别显示在下拉选择框
    // 发布提交请求
    const response = await instance.post("addPost", {
      name: name.value,
      postSmallType: {
        name:postSmallTypeName.value
      },
      deliveryDeadline: deliveryDeadline.value,
      workCity: workCity.value,
      workPlace: workPlace.value,
      pay: pay.value,
      minInternship: minInternship.value,
      status: status.value,
      description: description.value,
      demand: demand.value
    });
    const responseCode = response.data.code;
    if(responseCode == '0'){
      message.error("岗位发布失败！"+ response1.data.data)
      return;
    }
    if(responseCode=="1"){
      message.success("岗位发布成功!")
    }
  } catch (e) {
    alert("出现异常！")
  }
}

</script>
