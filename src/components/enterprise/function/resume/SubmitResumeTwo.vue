<template>
  <div class="resume-submit-list">
    <form @submit.prevent="searchApprovalRecord" style="display: flex; align-items: center; gap: 16px;">
      <input placeholder="学生姓名" type="text" v-model="searchParams.studentName" class="form-input" />
      <select class="form-select" v-model="searchParams.approvalStageStatus" placeholder="审批阶段状态">
        <option value="" disabled selected>选择审批阶段状态</option>
        <option value="通过">通过</option>
        <option value="未通过">未通过</option>
        <option value="审核中">审核中</option>
      </select>
      <DatePicker v-model:value="searchParams.submitTime" placeholder="投递时间" class="form-input"></DatePicker>
      <button type="submit" class="form-button">搜索</button>
    </form>
    <div v-for="(item, index) in resumeSubmitForm" :key="index" class="resume-submit-item">
      <div class="resume-info">
        <div class="student-avatar-id" style="display: flex; flex-direction: column; align-items: center;">
          <router-link :to="'/studentResume/' + item.studentId">
            <img class="student-avatar" :src="item.studentHeadUrl" alt="student-avatar" style="width: 50px; height: 50px; border-radius: 50%; margin-bottom: 10px;">
          </router-link>
        </div>
        <div class="student-info" style="display: flex; flex-direction: column;">
          <span style="font-family: Arial, sans-serif; font-size: 14px; color: #1890ff; font-weight: bold; margin-bottom: 5px;">下载查看简历</span>
          <el-link :href="item.resumeUrl" target="_blank" class="resume-link" type="primary" style="display: flex; align-items: center;">
            <el-icon><Document /></el-icon>
            <span style="margin-left: 5px;">{{ item.resumeName }}</span>
          </el-link>
        </div>
      </div>
      <!-- Submission time and status -->
      <div class="submission-details">
        <p style="font-family: 'Arial', sans-serif; font-size: 15px; color: #333; background-color: #ffffff; padding: 8px; border-radius: 4px;"><el-icon><Avatar /></el-icon>学生ID: {{ item.studentId }}</p>
        <p style="font-family: 'Arial', sans-serif; font-size: 15px; color: #333; background-color: #ffffff; padding: 8px; border-radius: 4px;"><el-icon><Timer /></el-icon>投递时间: {{ item.submitTime }}</p>
        <p style="font-family: 'Arial', sans-serif; font-size: 15px; color: #333; background-color: #ffffff; padding: 8px; border-radius: 4px;"><el-icon><List /></el-icon>投递记录ID: {{ item.submitId }}</p>
        <p style="font-family: 'Arial', sans-serif; font-size: 15px; color: #333; background-color: #ffffff; padding: 8px; border-radius: 4px;"><el-icon><List /></el-icon>审批记录ID: {{ item.approvalId }}</p>
        <p style="font-family: 'Arial', sans-serif; font-size: 15px; color: #333; background-color: #ffffff; padding: 8px; border-radius: 4px;"><el-icon><List /></el-icon>审批阶段: {{ item.approvalStageName }}</p>
        <p style="font-family: 'Arial', sans-serif; font-size: 15px; color: #333; background-color: #ffffff; padding: 8px; border-radius: 4px;"><el-icon><List /></el-icon>阶段状态: {{ item.status }}</p>
        <p style="font-family: 'Arial', sans-serif; font-size: 15px; color: #333; background-color: #ffffff; padding: 8px; border-radius: 4px;"><el-icon><Timer /></el-icon>最新更新时间: {{ item.approvalUpdateTime }}</p>
        <p style="font-family: 'Arial', sans-serif; font-size: 15px; color: #333; background-color: #ffffff; padding: 8px; border-radius: 4px;"><el-icon><Timer /></el-icon>审批时间: {{ item.approvalTime }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import instance from '@/axios-instance';
import {DatePicker, message} from 'ant-design-vue';

const resumeSubmitForm = ref([]);

const searchParams = ref({
  studentName: '',
  submitTime:'',
  approvalStageStatus: '',
});

// 获取路由参数
const route = useRoute();

// 页面加载时获取投递记录
onMounted(() => {
  getNotViewResumeSubmit();
});

import {defineProps, watch} from 'vue';
import {Avatar, Document, List, StarFilled, Timer} from "@element-plus/icons-vue";

// 定义接收的事件
const props = defineProps({
  approvalStage:String
});

// 获取待查看简历投递记录
async function getNotViewResumeSubmit() {
  try {
    const postId = route.params.postId; // 获取岗位ID
    const response = await instance.post('/selectPostSubmitSituationOnApprovalStage', {
      resumeApprovalStage:{
        stageName:props.approvalStage,
      },
      submit:{
        post:{
          id:postId
        },
      }
    });

    if (response.data.code === 0) {
      message.error(response.data.data);
      return;
    }

    resumeSubmitForm.value = response.data.data;
    message.success('Get post submit situation success!');
  } catch (e) {
    message.error('Catch error, Get post submit situation failed!');
  }
}

const searchApprovalRecord =  async () =>{
  try {
    const postId = route.params.postId; // 获取岗位ID
    const response = await instance.post("/selectApprovalRecordConditionallyTow",{
      resumeApprovalStage:{
        stageName:props.approvalStage,
        status:searchParams.value.approvalStageStatus
      },
      submit:{
        submitTime:searchParams.value.submitTime,
        post:{
          id:postId
        },
        resume:{
          student:{
            name:searchParams.value.studentName
          }
        }
      }
    })
    if(response.data.code==0){
      message.error(response.data.data)
      return
    }
    resumeSubmitForm.value = response.data.data
    message.success("Search approval record success!");
  }catch (e){
    message.error("Catch error while search approval record!");
  }
}


</script>

<style scoped>
.resume-submit-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.resume-submit-item {
  border: 1px solid #ccc;
  padding: 20px;
  border-radius: 8px;
}

.resume-info {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.student-info {
  display: flex;
  align-items: center;
}

.student-avatar {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin-right: 10px;
}

.student-name-id {
  display: flex;
  flex-direction: column;
}

.student-name {
  font-size: 16px;
  font-weight: bold;
  color: #333;
  text-decoration: none;
}

.student-id {
  font-size: 14px;
  color: #666;
  text-decoration: none;
}

.resume-link {
  font-size: 16px;
  color: #1890ff;
  text-decoration: none;
}

.submit-time {
  font-size: 14px;
  color: #666;
}

.form-input {
  flex-grow: 1;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.1);
  color: black;
}

.form-select {
  flex-grow: 1;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.1);
  color: black;
}

.form-button {
  color: #fff;
  background-color: #108ee9;
  border: none;
  border-radius: 4px;
  padding: 8px 16px;
  cursor: pointer;
}

</style>
