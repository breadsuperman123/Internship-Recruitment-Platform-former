<template>
  <a-list item-layout="horizontal" :data-source="attachmentResumes">
    <template #renderItem="{ item }">
      <a-list-item>
        <a-list-item-meta>
          <template #title>
            <div class="resume-info">
              <a :href="item.path" download>{{ item.title }}</a>
              <a-button size="small" @click="submitResume(item.path)">投递</a-button>
            </div>
          </template>
          <template #avatar>
            <a-avatar style="width: 60px;height: 60px" src="/resumeLogo.png" />
          </template>
        </a-list-item-meta>
      </a-list-item>
    </template>
  </a-list>
</template>

<script lang="ts" setup>
import { ref, onMounted ,defineProps } from 'vue';
import { useRouter } from 'vue-router';
import axios from "axios";

interface DataItem {
  title: string;
  path: string;
}

const router = useRouter();
const attachmentResumes = ref<DataItem[]>([]);
const jwtToken = localStorage.getItem("jwtToken");
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
const props = defineProps({
  postId: String
});

// 获取学生的附件简历数据
const viewAllLocalResume = async () => {
  try {
    const response = await instance.post("/resumeGetByStudentId");
    attachmentResumes.value = response.data.map((resume: any) => ({ title: resume.name, path: resume.resumeUrl}));// 将附件简历的名称映射为 title 字段
    console.log("该学生的附件简历结果为：", response.data);
  } catch (error) {
    console.error("获取附件简历时出错：", error);
  }
}
const submitResume = async (resumePath: string) => {
  try {
    await instance.post("/submitResumeByStudentIdPostIdResume",{postId: props.postId,resumeUrl:resumePath});
    window.location.reload();
    console.log("投递简历：", resumePath);
  } catch (error) {
    console.error("投递简历时出错：", error);
  }
}
onMounted(() => {
  viewAllLocalResume();
});
</script>

<style>
.resume-info {
  display: flex;
  align-items: center;
}
.resume-info a {
  margin-right: 10px; /* 可根据需要调整间距 */
}
</style>
