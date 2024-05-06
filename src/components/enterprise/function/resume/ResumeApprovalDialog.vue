<template>
  <div id="components-modal-demo-position">
    <a-button type="primary" @click="handleButtonClick">
      审批
    </a-button>
    <a-modal
        style="width: 650px;"
        v-model:open="modalVisible"
        title="岗位信息"
        centered
        @ok="closeDetailDialog"
    >
      <div>
        <p>岗位名称：{{formData.postName}}</p>
        <p>学生姓名：{{formData.studentName}}</p>
        <p>当前审批阶段：{{formData.currentStage}}</p>
        <p>当前审批阶段状态：{{formData.currentStageStatus}}</p>
      </div>
      <strong><p style="color: #3459d2">更新审批阶段</p></strong>
      <form @submit.prevent="updateApprovalStage" style="display: flex; flex-direction: column; gap: 16px;">
        <div class="form-group">
          <label for="approvalStageName">审批阶段：</label>
          <select id="approvalStageName" class="form-control" v-model="approvalStageName">
            <option value="" disabled selected>选择审批阶段</option>
            <option value="初筛">初筛</option>
            <option value="笔试">笔试</option>
            <option value="面试">面试</option>
            <option value="录用">录用</option>
          </select>
        </div>
        <div class="form-group">
          <label for="approvalStageStatus">阶段状态：</label>
          <select id="approvalStageStatus" class="form-control" v-model="approvalStageStatus">
            <option value='' disabled selected>选择审批阶段状态</option>
            <option value="通过">通过</option>
            <option value="未通过">未通过</option>
            <option value="审核中">审核中</option>
          </select>
        </div>
        <button type="submit" class="submit-button">提交审批</button>
      </form>
    </a-modal>
  </div>
</template>

<script lang="ts" setup>
import { ref, defineProps } from 'vue';
import instance from "@/axios-instance";
import {message} from "ant-design-vue";

const approvalStageName = ref("");
const approvalStageStatus = ref("");

const formData = ref({
  studentName:"",
  postName:"",
  currentStage:"",
  currentStageStatus:"",
})

const modalVisible = ref<boolean>(false);

const props = defineProps({
  approvalId: Number,
});

const updateApprovalStage = async () => {
  //
  if(approvalStageName.value=="" || approvalStageName.value==null){
    message.warn("请选择简历当前审批所处阶段")
    return
  }
  if(approvalStageStatus.value=="" || approvalStageStatus.value==null){
    message.warn("请选择简历当前审批阶段状态")
    return
  }
  try {
    const response = await instance.post("/updateApprovalStage",{
      id: props.approvalId,
      resumeApprovalStage:{
        stageName: approvalStageName.value,
        status:approvalStageStatus.value
      }
    })
    if(response.data.code==0){
      message.warn(response.data.data)
      return
    }
    message.success(response.data.data)
  }catch (e) {
    message.error("Catch error while update approval stage!")
  }
};

const handleButtonClick = async () => {
  modalVisible.value = true;
  // 获取审批 投递记录信息
  try {
    const response = await instance.post("/getOneSubmitApprovalInfo",{
      id: props.approvalId,
    })
    if(response.data.code==0){
      message.warn(response.data.data)
    }
    formData.value = response.data.data[0]
    message.success("Get submit approval info success!")
  }catch (e) {
    message.error("Catch error while get submit approval info!")
  }
};

const closeDetailDialog = () => {
  modalVisible.value = false;
};
</script>

<style scoped>
.form-group {
  margin-bottom: 20px;
}

.form-control {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 14px;
  line-height: 1.3;
}

label {
  font-weight: bold;
}

.submit-button {
  width: 100%;
  padding: 10px;
  border: none;
  border-radius: 4px;
  background-color: #007bff;
  color: #fff;
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.submit-button:hover {
  background-color: #0056b3;
}
</style>
