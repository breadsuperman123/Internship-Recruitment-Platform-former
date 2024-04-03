<script setup lang="ts">
import { ref } from 'vue';
import type { TableColumnsType } from 'ant-design-vue';
import axios from 'axios';

const searchParams = ref({
  id: '',
  submit_id:'',
  approval_stage: '',
});

const resumeSubmitColumns: TableColumnsType = [
  {
    title: 'ID',
    dataIndex: 'id',
    key: 'id',
  },
  {
    title: '投递记录ID',
    dataIndex: 'submit_id',
    key: 'submit_id',
  },
  {
    title: '简历查看时间',
    dataIndex: 'approval_time',
    key: 'approval_time',
  },
  {
    title: '更新时间',
    dataIndex: 'update_time',
    key: 'update_time',
  },
  {
    title: '审批HRID',
    dataIndex: 'hr_id',
    key: 'hr_id',
  },
  {
    title: '审批阶段',
    dataIndex: 'approval_stage',
    key: 'approval_stage',
  },
  {
    title: '操作/编辑',
    dataIndex: 'operation',
    key: 'operation',
  },
  // 更多列...
];

const resumeApprovalData = ref([
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
      submit_id:`submit_${i}`,
      approval_time: new Date().toISOString(),
      update_time: new Date().toISOString(),
      hr_id: `hr_${i}`,
      approval_stage: `查看`,
      operation: '审批/编辑',
    });
  }
  return data;
}

// Generate 100 dummy records and assign them to resumeSubmitData
resumeApprovalData.value = generateDummyData(100);



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


function handleReviewAction(key: string) {
  // Handle the review action here
  console.log(`Review action for key: ${key}`);
}

const searchApprovalRecord =  async () =>{
  try {
    const response = await instance.post("/searchApprovalRecord")
  }catch (e){
    alert("error");
  }
}

</script>

<template>
  <div>
    <div>
      <br>
      <form @submit.prevent="searchApprovalRecord" style="display: flex; align-items: center; gap: 16px;">
        <input placeholder="审批ID" type="text" v-model="searchParams.id" style="flex-grow: 1; padding: 8px; border: 1px solid #ccc; border-radius: 4px; box-shadow: inset 0 1px 2px rgba(0,0,0,0.1); color: black;" />
        <input placeholder="投递记录ID" type="text" v-model="searchParams.submit_id" style="flex-grow: 1; padding: 8px; border: 1px solid #ccc; border-radius: 4px; box-shadow: inset 0 1px 2px rgba(0,0,0,0.1); color: black;" />
        <select class="form-control" v-model="searchParams.approval_stage">
          <option value="recruiting">已读</option>
          <option value="stopped">初筛</option>
          <option value="stopped">笔试</option>
          <option value="stopped">面试</option>
          <option value="stopped">录取</option>
        </select>
        <button type="submit" style="color: #fff; background-color: #108ee9; border: none; border-radius: 4px; padding: 8px 16px; cursor: pointer;">搜索</button>
      </form>

      <br>
      <a-table :columns="resumeSubmitColumns" :dataSource="resumeApprovalData">
        <template v-slot:bodyCell="{ record, column }">
          <template v-if="column.key === 'submit_id'">
            <a-button @click="handleReviewAction(record.post_id)">{{record.submit_id}}</a-button>
          </template>

          <template v-if="column.key === 'operation'">
            <a-button @click="handleReviewAction(record.id)">操作</a-button>
          </template>
        </template>
      </a-table>
    </div>
  </div>
</template>

<style scoped>
.form-control {
  display: block;
  width: 100%;
  padding: .375rem .75rem;
  font-size: .875rem;
  line-height: 1.5;
  color: #495057;
  background-color: #fff;
  background-clip: padding-box;
  border: 1px solid #ced4da;
  border-radius: .25rem;
  transition: border-color .15s ease-in-out,box-shadow .15s ease-in-out;
}
</style>
