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
      <a-input v-model:value="formData.name" />
    </a-form-item>
    <a-form-item label="岗位类别">
      <a-select v-model:value="formData.postSmallTypeName">
        <a-select-option v-for="category in jobCategories" :key="category" :value="category.value">
          {{ category }}
        </a-select-option>
      </a-select>
    </a-form-item>
    <a-form-item label="投递截止日期">
      <a-date-picker v-model:value="formData.deliveryDeadline" />
    </a-form-item>
    <a-form-item label="工作城市">
      <a-input v-model:value="formData.workCity" />
    </a-form-item>
    <a-form-item label="工作地点">
      <a-input v-model:value="formData.workPlace" />
    </a-form-item>
    <a-form-item label="薪资">
      <a-input-number v-model:value="formData.pay" /><span>元/天</span>
    </a-form-item>
    <a-form-item label="最少实习时间">
      <a-input-number v-model:value="formData.minInternship" /><span>月</span>
    </a-form-item>
    <a-form-item label="岗位状态">
      <a-select v-model:value="formData.status">
        <a-select-option value="招聘中">招聘中</a-select-option>
        <a-select-option value="停止招聘">停止招聘</a-select-option>
      </a-select>
    </a-form-item>
    <a-form-item label="岗位描述">
      <a-textarea v-model:value="formData.description" :rows="5" />
    </a-form-item>

    <a-form-item label="岗位要求">
      <a-textarea v-model:value="formData.demand" :rows="5" />
    </a-form-item>

    <a-form-item style="text-align: center;">
      <a-button @click="updatePost" type="primary">提交发布</a-button>
    </a-form-item>
  </a-form>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import type {Dayjs} from 'dayjs';
const formData = ref({
  name: '',
  postSmallTypeName: '',
  deliveryDeadline: ref<Dayjs>(),
  workCity: '',
  workPlace: '',
  pay: null,
  minInternship: null,
  status: '',
  description: '',
  demand: ''
});

const jobCategories = ref([]);

const componentDisabled = ref(false);
const labelCol = { style: { width: '150px' } };
const wrapperCol = { span: 20 };

import instance from "@/axios-instance";
import {message} from "ant-design-vue"
import {defineProps, watch} from "vue";
import {anyType} from "ant-design-vue/es/_util/type";
import {dayjs} from "element-plus";


const getPostSmallType = async () => {
  try {
    // 获取所有岗位类别
    const response = await instance.get("/getPostSmallType");
    console.log(response.data.data)
    jobCategories.value = response.data.data; // 将岗位类别显示在下拉选择框
  } catch (e) {
    alert("岗位获取失败，出现异常！");
  }
};
const getPostInfo = async () =>{
  try {
    const response = await instance.post('/getPostInfo',{
      id:props.id,
      postSmallType:{
        name:props.postTypeName
      }
    });
    formData.value={
      name: response.data.data[0].name,
      postSmallTypeName: response.data.data[0].postSmallTypeName,
      deliveryDeadline: ref<Dayjs>(dayjs(response.data.data[0].deliveryDeadline, 'YYYY-MM-DD')),
      workCity: response.data.data[0].workCity,
      workPlace: response.data.data[0].workPlace,
      pay: response.data.data[0].pay,
      minInternship: response.data.data[0].minInternship,
      status: response.data.data[0].status,
      description: response.data.data[0].description,
      demand: response.data.data[0].demand
    }

    console.log("response.data.data:",response.data.data)
    console.log("formData.value:",formData.value)
    console.log("formData.value.name:",formData.value.name)

  } catch (error) {
    message.error('Get post info error!');
  }
}
onMounted(() => {
  getPostSmallType();
  getPostInfo();
});

// 定义接收的事件
const props = defineProps({
  clickNumbers: Number,
  id:Number,
  postTypeName:String
});

// 使用watch监听props.clickNumbers的变化
watch(() => props.clickNumbers, (newVal: any, oldVal: any) => {
  // 当clickNumbers改变时，调用getPostSmallType
  if (newVal != oldVal) {
    getPostSmallType();
    getPostInfo();
  }
});


const updatePost = async () =>{
  //
  try {
    const response = await instance.post("/updatePostInfo",{
      id:props.id,
      name: formData.value.name,
      postSmallType: {
        name:formData.value.postSmallTypeName
      },
      deliveryDeadline: formData.value.deliveryDeadline,
      workCity: formData.value.workCity,
      workPlace: formData.value.workPlace,
      pay: formData.value.pay,
      minInternship: formData.value.minInternship,
      status: formData.value.status,
      description: formData.value.description,
      demand: formData.value.demand
    })
    const code = response.data.code
    console.log("response.data:",response.data.data)
    if(code=="1") {
      message.success("Update success!")
    }else {
      message.error("Update error!")
    }
  }catch (e){
    message.error("Update error!")
  }
}



</script>
