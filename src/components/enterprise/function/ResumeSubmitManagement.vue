<script setup lang="ts">
import { ref } from 'vue';
import type { TableColumnsType } from 'ant-design-vue';
import axios from 'axios';
import { onMounted } from 'vue';
import { DatePicker } from 'ant-design-vue';


const { RangePicker } = DatePicker;

const searchParams = ref({
  id:'',
  postId: '',
  postName: '',
  dateRange: []
});

const resumeSubmitColumns: TableColumnsType = [
  {
    title: 'ID',
    dataIndex: 'id',
    key: 'id',
  },
  {
    title: '岗位ID',
    dataIndex: 'post_id',
    key: 'post_id',
  },
  {
    title: '岗位名称',
    dataIndex: 'post_name',
    key: 'post_name',
  },
  {
    title: '投递学生ID',
    dataIndex: 'stu_id',
    key: 'stu_id',
  },
  {
    title: '简历URL',
    dataIndex: 'resume_url',
    key: 'resume_url',
  },
  {
    title: '投递时间',
    dataIndex: 'submit_time',
    key: 'submit_time',
  },
  {
    title: '投递状态',
    dataIndex: 'status',
    key: 'status',
  },
  // 更多列...
];

const resumeSubmitData = ref([
    {

    }
]);

// Function to generate dummy data for the table
function generateDummyData(count: number) {
  const data = [];
  for (let i = 1; i <= count; i++) {
    data.push({
      key: i.toString(),
      id: i,
      post_id: `post_${i}`,
      post_name: `岗位名称_${i}`,
      stu_id: `stu_${i}`,
      resume_url: `http://example.com/resume_${i}.pdf`,
      submit_time: new Date().toISOString(),
      status: '待查看'
    });
  }
  return data;
}

// Generate 100 dummy records and assign them to resumeSubmitData
resumeSubmitData.value = generateDummyData(100);



// 获取本地存储的jwtToken并将其添加到请求头中
const jwtToken = localStorage.getItem('jwtToken');
// 创建axios实例
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

function downloadResume(url: string) {
  axios({
    url,
    method: 'GET',
    responseType: 'blob', // important
  }).then((response) => {
    const url = window.URL.createObjectURL(new Blob([response.data.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'resume.pdf'); // or any other extension
    document.body.appendChild(link);
    link.click();
  });
}

function handleReviewAction(key: string) {
  // Handle the review action here
  console.log(`Review action for key: ${key}`);
}

const searchSubmitRecord =  async () =>{
  try {
    const response = await instance.post("/searchSubmitRecord")
  }catch (e){
    alert("error");
  }
}

// ... other methods
</script>

<template>
  <div>
    <div>
      <br>
      <form @submit.prevent="searchSubmitRecord" style="display: flex; align-items: center; gap: 16px;">
        <input placeholder="投递ID" type="text" v-model="searchParams.id" style="flex-grow: 1; padding: 8px; border: 1px solid #ccc; border-radius: 4px; box-shadow: inset 0 1px 2px rgba(0,0,0,0.1); color: black;" />
        <input placeholder="岗位ID" type="text" v-model="searchParams.postId" style="flex-grow: 1; padding: 8px; border: 1px solid #ccc; border-radius: 4px; box-shadow: inset 0 1px 2px rgba(0,0,0,0.1); color: black;" />
        <input placeholder="岗位名称" type="text" v-model="searchParams.postName" style="flex-grow: 1; padding: 8px; border: 1px solid #ccc; border-radius: 4px; box-shadow: inset 0 1px 2px rgba(0,0,0,0.1); color: black;" />
        <RangePicker v-model="searchParams.dateRange" style="flex-grow: 2;" />
        <button type="submit" style="color: #fff; background-color: #108ee9; border: none; border-radius: 4px; padding: 8px 16px; cursor: pointer;">搜索</button>
      </form>

      <br>
      <a-table :columns="resumeSubmitColumns" :dataSource="resumeSubmitData">
        <template v-slot:bodyCell="{ record, column }">
          <template v-if="column.key === 'post_id'">
            <a-button @click="handleReviewAction(record.post_id)">操作</a-button>
          </template>
          <template v-if="column.key === 'stu_id'">
            <a-button @click="handleReviewAction(record.stu_id)">操作</a-button>
          </template>
          <template v-if="column.key === 'resume_url'">
            <a @click="downloadResume(record.resume_url)">下载简历</a>
          </template>
<!--          <template v-if="column.key === 'review'">-->
<!--            <a-button @click="handleReviewAction(record.key)">审核</a-button>-->
<!--          </template>-->
        </template>
      </a-table>
    </div>
  </div>
</template>

<style scoped>
/* ... your styles */
</style>
