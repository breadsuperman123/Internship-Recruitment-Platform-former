<template>
  <a-layout class="layout">
    <post-submit-situation-header></post-submit-situation-header>
    <a-layout-header>
      <div class="logo" />
      <a-menu
          v-model:selectedKeys="selectedKeys"
          theme="dark"
          mode="horizontal"
          :style="{ lineHeight: '64px' }"
      >
        <a-menu-item key="1">
          待查看
        </a-menu-item>
        <a-menu-item key="2">已查看</a-menu-item>
        <a-menu-item key="3">初筛</a-menu-item>
        <a-menu-item key="4">笔试</a-menu-item>
        <a-menu-item key="5">面试</a-menu-item>
        <a-menu-item key="6">录取</a-menu-item>
      </a-menu>
    </a-layout-header>
    <a-layout-content style="padding: 0 50px">
      <div :style="{ background: '#fff', padding: '24px', minHeight: '280px' }">
        <div v-if="selectedKeys==1" class="content">
          <submit-resume :status="notView"></submit-resume>
        </div>
        <div v-else-if="selectedKeys==2" class="content">
          <submit-resume :status="viewed"></submit-resume>
        </div>
        <div v-else-if="selectedKeys==3" class="content">
          <submit-resume-two :approvalStage="preliminaryScreening"></submit-resume-two>
        </div>
        <div v-else-if="selectedKeys==4" class="content">
          <submit-resume-two :approvalStage="writingExamination"></submit-resume-two>
        </div>
        <div v-else-if="selectedKeys==5" class="content">
          <submit-resume-two :approvalStage="interview"></submit-resume-two>
        </div>
        <div v-else-if="selectedKeys==6" class="content">
          <submit-resume-two :approvalStage="offer"></submit-resume-two>
        </div>
      </div>
    </a-layout-content>
    <a-layout-footer style="text-align: center">
      practice ©2024 Created by bjut
    </a-layout-footer>
  </a-layout>
</template>



<script lang="ts" setup>
import { ref } from 'vue';
import PostSubmitSituationHeader from "@/components/enterprise/function/post/PostSubmitSituationHeader.vue";
import SubmitResume from "@/components/enterprise/function/resume/SubmitResume.vue";
import SubmitResumeTwo from "@/components/enterprise/function/resume/SubmitResumeTwo.vue";
const selectedKeys = ref<string[]>(['2']);

const notView = ref("待查看")
const viewed = ref("已查看")
const preliminaryScreening = ref("初筛")
const writingExamination = ref("笔试")
const interview = ref("面试")
const offer = ref("录取")

</script>



<style scoped>

#components-layout-demo-top .logo {
  float: left;
  width: 120px;
  height: 31px;
  margin: 16px 24px 16px 0;
  background: rgba(255, 255, 255, 0.3);
}
.ant-row-rtl #components-layout-demo-top .logo {
  float: right;
  margin: 16px 0 16px 24px;
}


</style>
