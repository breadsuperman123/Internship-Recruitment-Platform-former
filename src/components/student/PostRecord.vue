<script setup lang="ts">

import type { AnchorLinkProps } from 'ant-design-vue/es/anchor/AnchorLink';
import {AnchorProps} from
      "ant-design-vue";
import axios from "axios";
import {Dayjs} from "dayjs";

import {dayjs} from "element-plus";
import {ref} from "vue";
const clickCondition=ref({
  clickCondition:false,
  approvalStage:""
})
const postInfo = ref([
  {
    enterpriseName: '',
    postName: '',
    approvalTime:ref<Dayjs>(),
    workCity:'',
    status:'',
    stageName:''
  }
]);
// 令牌处理
const jwtToken = localStorage.getItem("jwtToken")
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
// 定义处理点击事件的函数
const handleClick: AnchorProps['onClick'] =  (e: { preventDefault: () => void; }, link: any) => {
  e.preventDefault();
  let condition = 0;//访问resumeapproval表
  postInfo.value = [];
  switch (link.href) {
    case '#waitSeen':
      // 执行与第一个标题对应的逻辑
      link.href = "待查看"
      console.log(link.href);
      condition = 1;//访问submit表
      break;
    case '#seen':
      link.href = "已查看"
      // 执行与第二个标题对应的逻辑
      console.log('点击了被查看');
      condition = 1;
      break;
    case '#firstSelect':
      link.href = "初筛"
      console.log('点击了初筛');
      break;
    case '#faceTest':
      link.href = "面试"
      console.log('点击了面试');
      break;
    case '#writeTest':
      link.href = "笔试"
      console.log('点击了面试');
      break;
    case '#offer':
      link.href = "录用"
      console.log('点击了录用');
      break;
    case '#fail':
      link.href = "不合适"
      console.log('点击了不合适');
      condition = 3;//访问所有的不合适
      break;
    default:
      break;
  }
  if (condition == 0) {
    instance.post('/postRecordSelectResumeApproval', {resumeApprovalStage: {stageName: link.href}})
        .then(response => {
          console.log(response.data);
          response.data.data.forEach((item: {
            postName: any;
            approvalTime: string | Dayjs | Date | null | undefined;
            enterpriseName: string;
            workCity: string;
            status: string;
          }, index: number) => {
            const {postName, approvalTime, enterpriseName, workCity, status} = item;

            postInfo.value[index] = {
              postName: postName,
              approvalTime: ref<Dayjs>(dayjs(approvalTime, 'YYYY-MM-DD')),
              enterpriseName: enterpriseName,
              workCity: workCity,
              status: status
            };
            clickCondition.value.approvalStage = link.href;
            clickCondition.value.clickCondition = true;
          });

          console.log(response.data.data)
        })
        .catch(error => {
          console.error(error);
        });

  }
  else if (condition==1){
    instance.post('/postRecordSelectSubmit', {status: link.href})
        .then(response => {
          console.log(response.data);
          response.data.data.forEach((item: {
            postName: any;

            enterpriseName: string;
            workCity: string;

          }, index: number) => {
            const {postName, enterpriseName, workCity} = item;

            postInfo.value[index] = {
              postName: postName,

              enterpriseName: enterpriseName,
              workCity: workCity,

            };
            clickCondition.value.approvalStage = link.href;
            clickCondition.value.clickCondition = true;
          });

          console.log(response.data.data)
        })
        .catch(error => {
          console.error(error);
        });
  }
  else if (condition==3){
    instance.post('/postRecordSelectFail', {resumeApprovalStage: {status: link.href}})
        .then(response => {
          console.log(response.data);
          response.data.data.forEach((item: {
            postName: any;
            approvalTime: string | Dayjs | Date | null | undefined;
            enterpriseName: string;
            workCity: string;
            status: string;
            stageName: string;
          }, index: number) => {
            const {postName, approvalTime, enterpriseName, workCity, status,stageName} = item;

            postInfo.value[index] = {
              postName: postName,
              approvalTime: ref<Dayjs>(dayjs(approvalTime, 'YYYY-MM-DD')),
              enterpriseName: enterpriseName,
              workCity: workCity,
              status: status,
              stageName:stageName
            };
            clickCondition.value.approvalStage = link.href;
            clickCondition.value.clickCondition = true;
          });

          console.log(response.data.data)
        })
        .catch(error => {
          console.error(error);
        });
  }
}  ;
const formatDate = (date: string | number | Date | ref<Dayjs>) => {
  if (!date) return ''; // 如果日期不存在，返回空字符串
  const formattedDate = new Date(date).toISOString().split('T')[0]; // 将日期转换为 ISO 格式，然后提取日期部分
  return formattedDate;
};
</script>

<template>
  <div style="padding: 20px;">
    <a-anchor
        :bounds=20
        :showInkInFixed=true
        direction="horizontal"
        :items="[
        { key: 'horizontally-part-1', href: '#waitSeen', title: '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;待查看&nbsp;&nbsp;&nbsp;&nbsp;&nbsp&nbsp;&nbsp;&nbsp;',style: { fontSize: '18px'  }},
        { key: 'horizontally-part-2', href: '#seen', title: '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;已查看&nbsp;&nbsp;&nbsp;&nbsp;&nbsp&nbsp;&nbsp;&nbsp;',style: { fontSize: '18px'  } },
        { key: 'horizontally-part-3', href: '#firstSelect', title: '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;初筛&nbsp;&nbsp;&nbsp;&nbsp;&nbsp&nbsp;&nbsp;&nbsp;' ,style: { fontSize: '18px'  }},
        { key: 'horizontally-part-5', href: '#writeTest', title: '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;笔试&nbsp;&nbsp;&nbsp;&nbsp;&nbsp&nbsp;&nbsp;&nbsp;' ,style: { fontSize: '18px'  }},
        { key: 'horizontally-part-4', href: '#faceTest', title: '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;面试&nbsp;&nbsp;&nbsp;&nbsp;&nbsp&nbsp;&nbsp;&nbsp;' ,style: { fontSize: '18px'  }},
        { key: 'horizontally-part-6', href: '#offer', title: '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;录用&nbsp;&nbsp;&nbsp;&nbsp;&nbsp&nbsp;&nbsp;&nbsp;' ,style: { fontSize: '18px'  }},
        { key: 'horizontally-part-7', href: '#fail', title: '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;不合适&nbsp;&nbsp;&nbsp;&nbsp;&nbsp&nbsp;&nbsp;&nbsp;' ,style: { fontSize: '18px'  }}
      ]"
        @click="handleClick"
    />
  </div>
  <div v-if="clickCondition.clickCondition">
    <div v-for="(organization, index) in postInfo" :key="index">
      <div v-if="clickCondition.approvalStage==='待查看'||clickCondition.approvalStage==='已查看'">
        <a-card class="custom-card">
          <div class="top-row">
            <span class="post-name">{{ organization.postName }}</span>
            </div>
          <div class="company-info">
            <span>{{ organization.enterpriseName+"—"+organization.workCity  }}</span>
            <span>{{ clickCondition.approvalStage }}</span>
          </div>
        </a-card>
      </div>
      <div v-if="clickCondition.approvalStage==='初筛'||clickCondition.approvalStage==='笔试'||clickCondition.approvalStage==='面试'||clickCondition.approvalStage==='录用'">
      <a-card class="custom-card">
        <div class="top-row">
          <span class="post-name">{{ organization.postName }}</span>
        <span class="approval-time">{{ "审核时间："+formatDate(organization.approvalTime) }}</span>
        </div>
        <div class="company-info">
          <span>{{ organization.enterpriseName+"—"+organization.workCity  }}</span>
          <span>{{ clickCondition.approvalStage +"|"+organization.status}}</span>
        </div>
      </a-card>
      </div>
      <div v-if="clickCondition.approvalStage==='不合适'">
        <a-card class="custom-card">
          <div class="top-row">
            <span class="post-name">{{ organization.postName }}</span>
            <span class="approval-time">{{ "审核时间："+formatDate(organization.approvalTime) }}</span>
          </div>
          <div class="company-info">
            <span>{{ organization.enterpriseName+"—"+organization.workCity  }}</span>
            <span>{{organization.stageName +"|"+clickCondition.approvalStage}}</span>
          </div>
        </a-card>
      </div>
    </div>
  </div>
</template>

<style scoped>
.custom-card {
  border: 1px solid #e0e0e0;
  border-radius: 5px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  padding: 20px;
  margin-bottom: 20px;
  max-width: 900px; /* 设置最大宽度 */

}

.post-name {
  font-size: 24px;
  font-weight: bold;
  color: #333;
  margin-bottom: 10px;
}

.approval-time {
  font-size: 14px;
  color: #888;
  text-align: right;
}

.company-info {
  display: flex;
  justify-content: space-between;
  font-size: 18px;
  color: #666;
}
.top-row {
  display: flex;
  justify-content: space-between;
  align-items: baseline; /* 基线对齐以保持元素的垂直对齐 */
  margin-bottom: 10px;
}
</style>