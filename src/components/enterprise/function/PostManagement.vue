<template>
  <div class="container">
    <div class="search-form">
      <form class="form-inline" @submit.prevent="searchPost">
        <div class="form-group">
          <insert-post-dialog></insert-post-dialog>
        </div>
        <div class="form-group">
          <input class="form-control" placeholder="岗位名称" type="text" v-model="name"/>
        </div>
        <div class="form-group">投递截止时间：</div>
        <div class="form-group">
          <input class="form-control" type="date" v-model="delivery_deadline" placeholder="投递截止时间"/>
        </div>
        <div class="form-group">简历状态：</div>
        <div class="form-group">
          <select class="form-control" v-model="status">
            <option value="recruiting">招聘中</option>
            <option value="stopped" style="color: red">停止招聘</option>
          </select>
        </div>
        <button type="submit" class="btn btn-primary">搜索</button>
      </form>
    </div>
    <div v-for="post in posts" :key="post.id" class="post-item">
      <div class="post-info">
        <h3>{{ post.name }}</h3>
        <p>岗位ID：{{ post.id }}</p>
        <p>岗位类别：{{ post.postSmallTypeName }}</p>
        <p>最少实习时间：{{ post.min_internship }}月</p>
        <p>薪资：{{ post.pay }}￥/天</p>
        <p>投递截止日期：{{ post.delivery_deadline }}</p>
        <p>工作城市：{{ post.work_city }}</p>
        <p>岗位状态：{{ post.status }}</p>
      </div>
      <div class="post-actions">
        <post-detail-dialog @click="editPost(post.id)"></post-detail-dialog>
        <!--        <button class="btn btn-info" @click="editPost(post.id)">编辑</button>-->
        <button class="btn btn-secondary" @click="viewDelivery(post.id)">投递情况</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {ref} from 'vue'
import axios from 'axios'
import router from '@/router';
import {onMounted} from 'vue';
import PostDetailDialog from "@/components/enterprise/function/post/PostDetailDialog.vue";
import InsertPostDialog from "@/components/enterprise/function/post/InsertPostDialog.vue";


const name = ref('')
const delivery_deadline = ref('')
const status = ref('')
const posts = ref([]) // 空数组

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


// 生成一百个岗位
for (let i = 1; i <= 100; i++) {
  posts.value.push({
    id: i.toString(),
    smallPostName: `Small Post ${i}`,
    name: `岗位 ${i}`,
    work_city: `城市 ${i}`,
    min_internship: `${i} 个月`,
    delivery_deadline: `2024-04-${i}`,
    status: i % 2 === 0 ? 'stopped' : 'recruiting' // 招聘中或停止招聘交替
  })
}

// 页面加载完毕发送请求
// 在页面加载完毕后发送请求
onMounted(() => {
  // 调用发送 GET 请求的方法，
  getPost()
});

import {defineProps, watch} from 'vue';

// 定义接收的事件
const props = defineProps({
  clickNumbers: Number,
  clickMenuOnes:Number
});

// 使用watch监听props.clickNumbers的变化
watch(() => props.clickNumbers, (newVal: any, oldVal: any) => {
  // 当clickNumbers改变时，调用getPostSmallType
  if (newVal == "1") {
    getPost();
  }
});

watch(() => props.clickMenuOnes, (newVal: any, oldVal: any) => {
  // 当clickNumbers改变时，调用getPostSmallType
  if (newVal != oldVal) {
    getPost();
  }
});


const getPost = async () => {
  try {
    console.log("岗位管理页面获取的jwt令牌：", jwtToken)
    const response = await instance.get("/selectPostData");
    posts.value = response.data.data;
    console.log(response.data)

  } catch (error: any) {
    console.error('Error fetching data:', error);
    if (error.response && error.response.status === 401) {
      // 如果后端返回未登录状态码，处理未登录逻辑
      alert('您未登录，请先登录');
      // 这里可以跳转到登录页面或者执行其他处理
    } else {
      // 处理其他错误
      alert('发生错误，请稍后重试');
    }
  }
};

const searchPost = async () => {
  const response = await instance.post('/searchPostConditionally', {
      name: name.value,
      deadline: delivery_deadline.value,
      status: status.value
  });
  posts.value = response.data
}

const editPost = (postId: any) => {
  // handle edit post
}

const viewDelivery = (postId: any) => {
  window.open("/postSubmitSituationView", "_blank");
}
</script>

<style scoped>
.container {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  max-width: 900px;
  margin: auto;
  padding: 20px;
  background-color: #f8f9fa;
}

.form-inline {
  display: flex;
  flex-flow: row wrap;
  align-items: center;
}

.form-group {
  margin-right: 15px;
}

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
  transition: border-color .15s ease-in-out, box-shadow .15s ease-in-out;
}

.btn {
  padding: .375rem .75rem;
  font-size: .875rem;
  line-height: 1.5;
  border-radius: .25rem;
  transition: color .15s ease-in-out, background-color .15s ease-in-out, border-color .15s ease-in-out, box-shadow .15s ease-in-out;
}

.btn-primary {
  color: #fff;
  background-color: #007bff;
  border-color: #007bff;
}

.btn-info {
  color: #fff;
  background-color: #307fda;
  border-color: #1864bb;
}

.btn-secondary {
  color: #fff;
  background-color: #6c757d;
  border-color: #6c757d;
}

.post-item {
  background-color: #fff;
  border: 1px solid #dee2e6;
  border-radius: .25rem;
  margin-bottom: 1rem;
  padding: .75rem 1.25rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.post-info h3 {
  font-size: 1.25rem;
  margin-bottom: .5rem;
}

.post-actions {
  display: flex;
}

.post-actions button {
  margin-left: 10px;
}
</style>
