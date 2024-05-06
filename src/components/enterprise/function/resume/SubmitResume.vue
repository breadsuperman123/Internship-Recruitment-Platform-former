<template>
  <div class="resume-submit-list">
    <form @submit.prevent="searchSubmitRecord" style="display: flex; align-items: center; gap: 16px;">
      <input placeholder="学生姓名" type="text" v-model="searchParams.studentName" style="flex-grow: 1; padding: 8px; border: 1px solid #ccc; border-radius: 4px; box-shadow: inset 0 1px 2px rgba(0,0,0,0.1); color: black;" />
      <DatePicker v-model:value="searchParams.submitTime" placeholder="投递时间" style="flex-grow: 1;" />
      <button type="submit"  style="color: #fff; background-color: #108ee9; border: none; border-radius: 4px; padding: 8px 16px; cursor: pointer;">搜索</button>
    </form>

    <div v-for="(item, index) in resumeSubmitForm" :key="index" class="resume-submit-item">
      <div class="resume-info">
        <div class="student-avatar-id" style="display: flex; flex-direction: column; align-items: center;">
          <router-link :to="'/studentResume/' + item.studentId">
            <img class="student-avatar" :src="item.studentHeadUrl" alt="student-avatar" style="width: 50px; height: 50px; border-radius: 50%; margin-bottom: 10px;">
          </router-link>
        </div>
        <div class="student-info">
          <span style="font-family: Arial, sans-serif; font-size: 14px; color: #1890ff; font-weight: bold;">下载查看简历</span>
          <el-link @click="updateSubmitStatus(item.submitId)" :href="item.resumeUrl" target="_blank" class="resume-link" type="primary"><el-icon><Document /></el-icon>{{ item.resumeName }}</el-link>
        </div>
      </div>
      <!-- Submission time and status -->
      <div class="submission-details">
        <p style="font-family: 'Arial', sans-serif; font-size: 15px; color: #333; background-color: #ffffff; padding: 8px; border-radius: 4px;"><el-icon><Avatar /></el-icon>学生ID: {{ item.studentId }}</p>
        <p style="font-family: 'Arial', sans-serif; font-size: 15px; color: #333; background-color: #ffffff; padding: 8px; border-radius: 4px;"><el-icon><Avatar /></el-icon>学生姓名: {{ item.studentName }}</p>
        <p style="font-family: 'Arial', sans-serif; font-size: 15px; color: #333; background-color: #ffffff; padding: 8px; border-radius: 4px;"><el-icon><Timer /></el-icon>投递时间: {{ item.submitTime }}</p>

        <p style="font-family: 'Arial', sans-serif; font-size: 15px; color: #333; background-color: #ffffff; padding: 8px; border-radius: 4px;"><el-icon><StarFilled /></el-icon>状态: {{ item.submitStatus }}</p>
        <p style="font-family: 'Arial', sans-serif; font-size: 15px; color: #333; background-color: #ffffff; padding: 8px; border-radius: 4px;"><el-icon><List /></el-icon>投递记录ID: {{ item.submitId }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import instance from '@/axios-instance';
import {DatePicker, message} from 'ant-design-vue';
import {Timer,StarFilled,List,Avatar,Document} from '@element-plus/icons-vue'

const searchParams = ref({
  studentName: '',
  submitTime: null,
});

const searchSubmitRecord=async ()=>{
  //
  try {
    const postId = route.params.postId; // Get post ID
    const response = await instance.post("/searchSubmitRecordConditionalTwo",{
      submitTime: searchParams.value.submitTime,
      status:props.status,
      resume:{
        student:{
          name:searchParams.value.studentName
        },
      },
      post:{
        id:postId
      }
    })
    if(response.data.code==0){
      message.error(response.data.data)
      return
    }
    resumeSubmitForm.value = response.data.data
    message.success("Search submit record success!")
  }catch (e){
    message.error("error");
  }
}

const resumeSubmitForm = ref([]);

// Get route parameters
const route = useRoute();

// Fetch resume submission records on page load
onMounted(() => {
  getNotViewResumeSubmit();
});

import { defineProps } from 'vue';

// Define props
const props = defineProps({
  status: String
});

// Get pending-view resume submission records
async function getNotViewResumeSubmit() {
  try {
    const postId = route.params.postId; // Get post ID
    const response = await instance.post('/selectPostSubmitSituation', {
      status: props.status,
      post: {
        id: postId,
      },
    });

    if (response.data.code === 0) {
      message.error(response.data.data);
      return;
    }

    resumeSubmitForm.value = response.data.data;
    message.success('获取岗位提交情况成功！');
  } catch (e) {
    message.error('获取岗位提交情况失败！');
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
</script>

<style scoped>
/* Add your styling here */
.resume-submit-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.resume-submit-item {
  border: 1px solid #ebeef5;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 8px 0 rgba(0,0,0,0.1);
}

.resume-info {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.student-avatar-id {
  display: flex;
  flex-direction: column;
}

.student-avatar {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin-bottom: 10px;
}

.student-id {
  font-size: 14px;
  color: #666;
  text-decoration: none;
}

.student-info {
  display: flex;
  flex-direction: column;
}

.student-name {
  font-size: 16px;
  font-weight: bold;
  color: #333;
  text-decoration: none;
}

.resume-link {
  font-size: 16px;
  color: #409EFF; /* Adjusting color for Element Plus primary links */
  text-decoration: none;
}

.submission-details {
  display: flex;
  flex-direction: column;
}

.submit-time {
  font-size: 14px;
  color: #666;
}

.status {
  font-size: 14px;
  color: #666;
}
</style>
