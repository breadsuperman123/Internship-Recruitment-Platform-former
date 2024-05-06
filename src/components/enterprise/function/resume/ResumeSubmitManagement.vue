<script setup lang="ts">
import { ref } from 'vue';
import {message, TableColumnsType} from 'ant-design-vue';
import { onMounted } from 'vue';


// 时间范围组件
import { DatePicker,TimePicker } from 'ant-design-vue';

const searchParams = ref({
  postName:'',
  studentName: '',
  submitTime: null,
});

const resumeSubmitColumns: TableColumnsType = [
  {
    title: 'SubmitID',
    dataIndex: 'submitId',
    key: 'submitId',
  },
  {
    title: '岗位ID',
    dataIndex: 'postId',
    key: 'postId',
  },
  {
    title: '岗位名称',
    dataIndex: 'postName',
    key: 'postName',
  },
  {
    title: '投递学生ID',
    dataIndex: 'studentId',
    key: 'studentId',
  },
  {
    title: '学生姓名',
    dataIndex: 'studentName',
    key: 'studentName',
  },
  {
    title: '简历URL',
    dataIndex: 'resumeUrl',
    key: 'resumeUrl',
  },
  {
    title: '投递时间',
    dataIndex: 'submitTime',
    key: 'submitTime',
  },
  {
    title: '投递状态',
    dataIndex: 'status',
    key: 'status',
  },
  {
    title: '进入初筛阶段',
    dataIndex: 'preliminaryScreening',
    key: 'preliminaryScreening',
  }
];

const resumeSubmitData = ref([
]);

// Function to generate dummy data for the table
function generateDummyData(count: number) {
  const data = [];
  for (let i = 1; i <= count; i++) {
    data.push({
      key: i.toString(),
      submitId: i,
      postId: `post_${i}`,
      postName: `岗位名称_${i}`,
      studentName:`学生姓名_${i}`,
      studentId: `stu_${i}`,
      resumeUrl: `http://example.com/resume_${i}.pdf`,
      submitTime: new Date().toISOString(),
      status: '待查看'
    });
  }
  return data;
}

resumeSubmitData.value = generateDummyData(20);



import instance from "@/axios-instance";


function postDetail(postId: any) {
  console.log(`postId: ${postId}`);
  // 构建带有 postId 路由参数的 URL
  const url = `/postSubmitSituationView/${postId}`;
  // 在新标签页中打开 URL
  // router.push(url)
  window.open(url);
}


function studentDetail(studentId: any) {
  console.log(`studentId: ${studentId}`);
  // 构建带有 postId 路由参数的 URL
  const url = `/studentResume/${studentId}`;
  // 在新标签页中打开 URL
  // router.push(url)
  window.open(url);
}

const selectSubmitConditional =  async () =>{
  try {
    const response = await instance.post("/searchSubmitRecordConditional",{
      submitTime: searchParams.value.submitTime,
      resume:{
        student:{
          name:searchParams.value.studentName
        },
      },
      post:{
        name:searchParams.value.postName
      }
    })
    if(response.data.code==0){
      message.error(response.data.data)
      return
    }
    resumeSubmitData.value = response.data.data
    message.success("Search submit record success!")
  }catch (e){
    message.error("error");
  }
}


import {defineProps, watch} from 'vue';

// 定义接收的事件
const props = defineProps({
  clickNumbers: Number,
  isClickSubmitRecord:Boolean
});

// 使用watch监听props.clickNumbers的变化
watch(() => props.clickNumbers, (newVal: any, oldVal: any) => {
  // 当clickNumbers改变时，调用getPostSmallType
  if (newVal == "2.2") {
    // 获取投递记录
    getSubmitRecord()
  }
});
watch(() => props.isClickSubmitRecord, (newVal: any, oldVal: any) => {
  // 当clickNumbers改变时
  if (newVal != oldVal) {
    // 获取投递记录
    getSubmitRecord()
  }
});

onMounted(() => {
  getSubmitRecord();
});

const getSubmitRecord = async()=>{
  try {
    const response = await instance.get("/getSubmitRecord")
    if(response.data.code == 0){
      message.error(response.data.data)
      return
    }
    message.success("Get submit record success!")
    resumeSubmitData.value = response.data.data;
  }catch (e) {
    message.error("Catch error while get submit record!")
  }
}

const updateSubmitStatus=async(submitId:any)=>{
  //
  try {
    const response = await instance.post("/updateSubmitStatus",{
      status:'已查看',
      id:submitId
    })
    if(response.data.code==0){
      message.error(response.data.data);
    }
    message.success(response.data.data)
  }catch (e){
    message.error("Catch error!")
  }
}

import {Modal} from "ant-design-vue";

const intoPreliminaryScreening = async(submitId:any) =>{
  try {
    // 弹出确认对话框
    const confirmResult = await new Promise((resolve) => {
      // 使用 ant-design-vue 的 Modal.confirm 方法显示确认对话框
      Modal.confirm({
        title: '确认进入初筛阶段',
        content: '是否确认将该简历进入初筛阶段？',
        okText: '确认',
        cancelText: '取消',
        onOk() {
          // 用户确认时执行 resolve(true)
          resolve(true);
        },
        onCancel() {
          // 用户取消时执行 resolve(false)
          resolve(false);
        },
      });
    });

    // 用户确认后才执行提交
    if (confirmResult) {
      const response = await instance.post("/intoPreliminaryScreening", {
        id: submitId
      });
      if (response.data.code === 0) {
        message.error(response.data.data);
        return;
      }
      message.success(response.data.data);
    } else {
      // 用户取消确认时的操作
      message.info('已取消操作');
    }
  } catch (e) {
    message.error("Catch error while into preliminary screening stage!");
  }
}
import {Document,Operation,Avatar} from '@element-plus/icons-vue'
</script>

<template>
  <div>
    <div>
      <br>
      <form @submit.prevent="selectSubmitConditional" style="display: flex; align-items: center; gap: 16px;">
        <input placeholder="岗位名称" type="text" v-model="searchParams.postName" style="flex-grow: 1; padding: 8px; border: 1px solid #ccc; border-radius: 4px; box-shadow: inset 0 1px 2px rgba(0,0,0,0.1); color: black;" />
        <input placeholder="学生姓名" type="text" v-model="searchParams.studentName" style="flex-grow: 1; padding: 8px; border: 1px solid #ccc; border-radius: 4px; box-shadow: inset 0 1px 2px rgba(0,0,0,0.1); color: black;" />
        <DatePicker v-model:value="searchParams.submitTime" placeholder="投递时间"></DatePicker>
        <button type="submit" style="color: #fff; background-color: #108ee9; border: none; border-radius: 4px; padding: 8px 16px; cursor: pointer;">搜索</button>
      </form>

      <br>
      <a-table
          :columns="resumeSubmitColumns"
          :dataSource="resumeSubmitData"
          :header-cell="{ background: '#007bff' }"
      >
        <template v-slot:bodyCell="{ record, column }">
          <template v-if="column.key === 'postId'">
            <a-button @click="postDetail(record.postId)" style="color: #00b2ff">岗位详情</a-button>
          </template>
          <template v-if="column.key === 'studentId'">
            <a-button @click="studentDetail(record.studentId)" style="color: #00b2ff"><el-icon><Avatar /></el-icon>学生信息</a-button>
          </template>
          <template v-if="column.key === 'resumeUrl'">
            <div>
              <a :href="record.resumeUrl" target="_blank" type="primary" @click="updateSubmitStatus(record.submitId)"><el-icon><Document /></el-icon>查看简历</a>
            </div>
          </template>
          <template v-if="column.key === 'preliminaryScreening'">
            <a-button @click="intoPreliminaryScreening(record.submitId)" style="color: #00b2ff"><el-icon><Operation /></el-icon>进入初筛阶段</a-button>
          </template>

        </template>
      </a-table>
    </div>
  </div>
</template>

<style scoped>
/* ... your styles */
</style>
