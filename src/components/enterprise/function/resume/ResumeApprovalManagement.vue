<script setup lang="ts">
import {onMounted, ref} from 'vue';
import {message, TableColumnsType} from 'ant-design-vue';

const searchParams = ref({
  studentName: '',
  submitTime:'',
  approvalStageStatus: '',
  approvalStageName:''
});

const resumeSubmitColumns: TableColumnsType = [
  {
    title: '审批ID',
    dataIndex: 'approvalId',
    key: 'approvalId',
  },
  {
    title: '投递记录ID',
    dataIndex: 'submitId',
    key: 'submitId',
  },
  {
    title: '岗位名称',
    dataIndex: 'postName',
    key: 'postName',
  },
  {
    title: '学生姓名',
    dataIndex: 'studentName',
    key: 'studentName',
  },

  {
    title: '学生简历',
    dataIndex: 'resumeUrl',
    key: 'resumeUrl',
  },
  {
    title: '最新更新时间',
    dataIndex: 'approvalUpdateTime',
    key: 'approvalUpdateTime',
  },
  {
    title: '审批阶段',
    dataIndex: 'approvalStageName',
    key: 'approvalStageName',
  },
  {
    title: '阶段状态',
    dataIndex: 'approvalStageStatus',
    key: 'approvalStageStatus',
  },
  {
    title: '操作/编辑',
    dataIndex: 'operation',
    key: 'operation',
  },
  // 更多列...
];

const resumeApprovalData = ref([
]);

import instance from "@/axios-instance";

// 审批简历操作
function handleReviewAction(approvalId: string) {
  // Handle the review action here
  console.log(`Review action for key: ${approvalId}`);
}

const searchApprovalRecord =  async () =>{
  try {
    const response = await instance.post("/selectApprovalRecordConditionally",{
      resumeApprovalStage:{
        stageName:searchParams.value.approvalStageName,
        status:searchParams.value.approvalStageStatus
      },
      submit:{
        post:{
          name:searchParams.value.postName
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
    resumeApprovalData.value = response.data.data
    message.success("Search approval record success!");
  }catch (e){
    message.error("Catch error while search approval record!");
  }
}

import {defineProps, watch} from 'vue';

// 定义接收的事件
const props = defineProps({
  clickNumbers: Number,
  isClickApprovalRecord:Boolean
});

// 使用watch监听props.clickNumbers的变化
watch(() => props.clickNumbers, (newVal: any, oldVal: any) => {
  // 当clickNumbers改变时，调用getPostSmallType
  if (newVal == "2.1") {
    // 获取已经审批的投递记录
    getApprovalRecord()
  }
});

watch(() => props.isClickApprovalRecord, (newVal: any, oldVal: any) => {
  // 当clickNumbers改变时，调用getPostSmallType
  if (newVal != oldVal) {
    // 获取已经审批的投递记录
    getApprovalRecord()
  }
});

onMounted(() => {
  getApprovalRecord();
});

const getApprovalRecord = async()=>{
  try {
    const response = await instance.get("/getApprovalRecord")
    if(response.data.code == 0){
      message.error(response.data.data)
      return
    }
    message.success("Get approval record success!")
    resumeApprovalData.value = response.data.data;
  }catch (e) {
    message.error("Catch error while get approval record!")
  }
}
function submitDetail(submitId:any){
  console.log(`submitId: ${submitId}`);
  // 构建带有 postId 路由参数的 URL
  const url = `/postSubmitSituationView/${submitId}`;
  // 在新标签页中打开 URL
  // router.push(url)
  // window.open(url);
}

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
  window.open(url);
}
import {Document,Operation,DocumentCopy} from '@element-plus/icons-vue'
import ResumeApprovalDialog from "@/components/enterprise/function/resume/ResumeApprovalDialog.vue";
</script>

<template>
  <div>
    <div>
      <br>
      <form @submit.prevent="searchApprovalRecord" style="display: flex; align-items: center; gap: 16px;">
        <input placeholder="岗位名称" type="text" v-model="searchParams.postName" style="flex-grow: 1; padding: 8px; border: 1px solid #ccc; border-radius: 4px; box-shadow: inset 0 1px 2px rgba(0,0,0,0.1); color: black;" />
        <input placeholder="学生姓名" type="text" v-model="searchParams.studentName" style="flex-grow: 1; padding: 8px; border: 1px solid #ccc; border-radius: 4px; box-shadow: inset 0 1px 2px rgba(0,0,0,0.1); color: black;" />
        <select class="form-control" v-model="searchParams.approvalStageName" placeholder="审批阶段">
          <option value="" disabled selected>选择审批阶段</option>
          <option value="初筛">初筛</option>
          <option value="笔试">笔试</option>
          <option value="面试">面试</option>
          <option value="录用">录用</option>
        </select>

        <select class="form-control" v-model="searchParams.approvalStageStatus" placeholder="阶段状态">
          <option value='' disabled selected>选择审批阶段状态</option>
          <option value="通过">通过</option>
          <option value="未通过">未通过</option>
          <option value="审核中">审核中</option>
        </select>
        <button  type="submit" style="color: #fff; background-color: #108ee9; border: none; border-radius: 4px; padding: 8px 16px; cursor: pointer;">搜索</button>
      </form>

      <br>
      <a-table
          :columns="resumeSubmitColumns"
          :dataSource="resumeApprovalData"
          :headerStyle="{ background: '#007bff' }"
      >
        <template v-slot:bodyCell="{ record, column }">
          <template v-if="column.key === 'submitId'">
            <a-button @click="submitDetail(record.submitId)" style="color: #007bff"><el-icon><DocumentCopy /></el-icon>投递详情</a-button>
          </template>
          <template v-if="column.key === 'resumeUrl'">
            <div>
              <a :href="record.resumeUrl" target="_blank" type="primary"><el-icon><Document /></el-icon>查看简历</a>
            </div>
          </template>
          <template v-if="column.key === 'operation'">
            <div style="display: flex; align-items: center;">
              <el-icon><Operation /></el-icon>
              <resume-approval-dialog :approvalId="record.approvalId"></resume-approval-dialog>
            </div>
          </template>
          <template v-if="column.key === 'approvalStageStatus'">
            <div v-if="record.approvalStageStatus=='通过'" style="background: green;color: white">
              {{record.approvalStageStatus}}
            </div>
            <div v-if="record.approvalStageStatus=='未通过'" style="background: red;color: white">
              {{record.approvalStageStatus}}
            </div>
            <div v-if="record.approvalStageStatus=='审核中'" style="background: yellow;color: black">
              {{record.approvalStageStatus}}
            </div>
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
