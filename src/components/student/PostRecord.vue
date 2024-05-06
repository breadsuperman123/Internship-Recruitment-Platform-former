<script setup lang="ts">

import type { AnchorLinkProps } from 'ant-design-vue/es/anchor/AnchorLink';
import {AnchorProps} from
      "ant-design-vue";
import axios from "axios";
import {Dayjs} from "dayjs";
import {ref} from "vue";
import {dayjs} from "element-plus";
const postInfo = ref([
  {
    enterpriseName: '',
    postName: '',
    approvalTime:ref<Dayjs>(),
    workCity:''
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
  switch (link.href) {
    case '#post':
      // 执行与第一个标题对应的逻辑
      link.href="已投递"
      console.log(link.href);
      break;
    case '#seen':
      link.href="被查看"
      // 执行与第二个标题对应的逻辑
      console.log('点击了被查看');
      break;
    case '#firstSelect':
      link.href="初筛"
      console.log('点击了初筛');
      break;
    case '#faceTest':
      link.href="面试"
      console.log('点击了面试');
      break;
    case '#offer':
      link.href="录用"
      console.log('点击了录用');
      break;
    case '#fail':
      link.href="不合适"
      console.log('点击了不合适');
      break;
    default:
      break;
  }
  instance.post('/postRecordSelect', {approvalStage: link.href})
      .then(response => {
        console.log(response.data);
        response.data.data.forEach((item: {
          postName: any;
          approvalTime: string | Dayjs | Date | null | undefined;
          enterpriseName: string;
          workCity: string;
        }, index: number) => {
          const {postName,approvalTime,enterpriseName,workCity } = item;
          postInfo.value[index] = {
            postName: postName,
            approvalTime: ref<Dayjs>(dayjs(approvalTime, 'YYYY-MM-DD')),
            enterpriseName:enterpriseName,
            workCity:workCity,
          };
        });
        console.log(response.data.data)
      })
      .catch(error => {
        console.error(error);
      });
};
</script>

<template>
  <div style="padding: 20px;">
    <a-anchor
        :bounds=20
        :showInkInFixed=true
        direction="horizontal"
        :items="[
        { key: 'horizontally-part-1', href: '#post', title: '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;已投递&nbsp;&nbsp;&nbsp;&nbsp;&nbsp&nbsp;&nbsp;&nbsp;',style: { fontSize: '18px'  }},
        { key: 'horizontally-part-2', href: '#seen', title: '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;被查看&nbsp;&nbsp;&nbsp;&nbsp;&nbsp&nbsp;&nbsp;&nbsp;',style: { fontSize: '18px'  } },
        { key: 'horizontally-part-3', href: '#firstSelect', title: '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;初筛&nbsp;&nbsp;&nbsp;&nbsp;&nbsp&nbsp;&nbsp;&nbsp;' ,style: { fontSize: '18px'  }},
        { key: 'horizontally-part-4', href: '#faceTest', title: '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;面试&nbsp;&nbsp;&nbsp;&nbsp;&nbsp&nbsp;&nbsp;&nbsp;' ,style: { fontSize: '18px'  }},
        { key: 'horizontally-part-5', href: '#offer', title: '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;录用&nbsp;&nbsp;&nbsp;&nbsp;&nbsp&nbsp;&nbsp;&nbsp;' ,style: { fontSize: '18px'  }},
        { key: 'horizontally-part-6', href: '#fail', title: '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;不合适&nbsp;&nbsp;&nbsp;&nbsp;&nbsp&nbsp;&nbsp;&nbsp;' ,style: { fontSize: '18px'  }}
      ]"
        @click="handleClick"
    />
  </div>
    <div v-for="(organization, index) in postInfo" :key="index">
      <a-card style="width: 600px">
        <p>{{ organization.enterpriseName}} | {{ organization.postName  }}</p>
      </a-card>
    </div>
</template>

<style scoped>
/* 修改锚点导航链接的样式 */
.a-anchor-item {
  font-size: 20px; /* 设置标题字体大小为20像素 */
}
</style>