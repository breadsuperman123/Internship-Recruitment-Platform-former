<template>
  <a-checkbox :checked="componentDisabled" @change="e => (componentDisabled = e.target.checked)">
    Form disabled
  </a-checkbox>
  <a-form
      :label-col="labelCol"
      :wrapper-col="wrapperCol"
      layout="horizontal"
      :disabled="componentDisabled"
      style="max-width: 1000px"
  >
    <a-form-item label="岗位名称">
      <a-input v-model="formData.jobTitle" />
    </a-form-item>
    <a-form-item label="岗位类别">
      <a-select v-model="formData.jobCategory">
        <a-select-option v-for="category in jobCategories" :key="category.value" :value="category.value">
          {{ category.text }}
        </a-select-option>
      </a-select>
    </a-form-item>
    <a-form-item label="投递截止日期">
      <a-date-picker v-model="formData.deadline" />
    </a-form-item>
    <a-form-item label="工作城市">
      <a-input v-model="formData.workCity" />
    </a-form-item>
    <a-form-item label="工作地点">
      <a-input v-model="formData.workLocation" />
    </a-form-item>
    <a-form-item label="薪资">
      <a-input-number v-model="formData.salary" /><span>元/天</span>
    </a-form-item>
    <a-form-item label="最少实习时间">
      <a-input-number v-model="formData.minInternshipDuration" /><span>月</span>
    </a-form-item>
    <a-form-item label="岗位状态">
      <a-select v-model="formData.approvalStatus">
        <a-select-option value="read">招聘中</a-select-option>
        <a-select-option value="initial_screening">停止招聘</a-select-option>
      </a-select>
    </a-form-item>
    <a-form-item label="岗位介绍">
      <a-textarea v-model="formData.jobDescription" :rows="5"/>
    </a-form-item>
    <a-form-item label="岗位要求">
      <a-textarea v-model="formData.jobRequirements" :rows="5" />
    </a-form-item>
  </a-form>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

const formData = ref({
  jobTitle: '',
  jobCategory: '',
  deadline: '',
  workCity: '',
  workLocation: '',
  salary: null,
  minInternshipDuration: null,
  approvalStatus: '',
  jobDescription: '',
  jobRequirements: ''
});

const jobCategories = ref([]);

const jwtToken = localStorage.getItem('jwtToken');
const componentDisabled = ref(true);
const labelCol = { style: { width: '150px' } };
const wrapperCol = { span: 20 };

const instance = axios.create({
  baseURL: 'http://localhost:8081',
  withCredentials: false,
  headers: {
    Authorization: jwtToken ? `Bearer ${jwtToken}` : ''
  }
});

onMounted(async () => {
  try {
    const response = await instance.get('/path-to-your-endpoint');
    formData.value = response.data; // Make sure the backend data structure matches the formData structure

    const categoriesResponse = await instance.get('/job-categories-endpoint');
    jobCategories.value = categoriesResponse.data; // Assuming the response data is an array of { value, text }
  } catch (error) {
    console.error('There was an error fetching the data:', error);
  }
});
</script>
