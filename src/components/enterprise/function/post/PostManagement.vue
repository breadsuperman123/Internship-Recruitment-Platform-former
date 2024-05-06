<template>
  <div class="container">
    <div class="search-form">
      <a-form class="form-inline" @submit.prevent="searchPost">
        <div class="form-group">
          <insert-post-dialog></insert-post-dialog>
        </div>
        <div class="form-group">
          <a-input class="form-control" placeholder="岗位名称" type="text" v-model:value="name"/>
        </div>
        <div class="form-group">投递截止时间：</div>
        <div class="form-group">
          <a-input class="form-control" type="date" v-model:value="delivery_deadline" placeholder="投递截止时间"/>
        </div>
        <div class="form-group">简历状态：</div>
        <div class="form-group">
          <a-select class="form-control" v-model:value="status">
            <a-select-option value="招聘中">招聘中</a-select-option>
            <a-select-option value="停止招聘" style="color: red">停止招聘</a-select-option>
          </a-select>
        </div>
        <a-form-item style="text-align: center;">
          <a-button @click="searchPost" type="primary">搜索</a-button>
        </a-form-item>
      </a-form>
    </div>
    <div v-for="post in posts" :key="post.id" class="post-item">
      <div class="post-info">
        <h3><el-icon style="color: #007bff;"><Postcard /></el-icon> {{ post.name }}</h3>
        <p><el-icon style="color: #007bff;"><Star /></el-icon>岗位ID：{{ post.id }}</p>
        <p><el-icon style="color: #007bff;"><Files /></el-icon>岗位类别：{{ post.postSmallTypeName }}</p>
        <p><el-icon style="color: #007bff;"><Timer /></el-icon>最少实习时间：{{ post.min_internship }}月</p>
        <p><el-icon style="color: #007bff;"><Money /></el-icon>薪资：{{ post.pay }}￥/天</p>
        <p><el-icon style="color: #007bff;"><Timer /></el-icon>投递截止日期：{{ post.delivery_deadline }}</p>
        <p><el-icon style="color: #007bff;"><Position /></el-icon>工作城市：{{ post.work_city }}</p>
        <p><el-icon style="color: #007bff;"><StarFilled /></el-icon>岗位状态：{{ post.status }}</p>
      </div>
      <div class="post-actions">
        <post-detail-dialog :id="post.id" :postTypeName="post.postSmallTypeName" @click="editPost(post.id)"></post-detail-dialog>
        <button class="btn btn-secondary" @click="viewDelivery(post.id)">投递情况</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {ref} from 'vue'
import {onMounted} from 'vue';
import PostDetailDialog from "@/components/enterprise/function/post/PostDetailDialog.vue";
import InsertPostDialog from "@/components/enterprise/function/post/InsertPostDialog.vue";
import {Star,Money,Timer,Position,StarFilled,Postcard,Files} from '@element-plus/icons-vue'

const name = ref('')
const delivery_deadline = ref(null)
const status = ref('')
const posts = ref([]) // 空数组

// 获取本地存储的jwtToken并将其添加到请求头中
const jwtToken = localStorage.getItem('jwtToken');
import instance from "@/axios-instance";

// 页面加载完毕发送请求
// 在页面加载完毕后发送请求
onMounted(() => {
  // 调用发送 GET 请求的方法，
  getPost()
});

const editPost = (postId: any) => {
  // handle edit post
}

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
import {message}  from "ant-design-vue";

const searchPost = async () => {
  try {
    console.log("name:",name.value)
    console.log("deliveryDeadline::",delivery_deadline.value)
    console.log("status:",status.value)
    const response = await instance.post('/searchPostConditionally', {
      name: name.value,
      deliveryDeadline: delivery_deadline.value,
      status: status.value
    });
    console.log("response.data.data:",response.data.data)
    if(response.data.code==0){
      message.warn("Not fund posts!")
      return;
    }
    if(response.data.code==1){
      posts.value = response.data.data
      message.success("search post success!")
    }
  } catch (e) {
    message.error("Search posts error!")
  }
}

const viewDelivery = (postId) => {
  console.log("current post id: ",postId)
  // 构建带有 postId 路由参数的 URL
  const url = `/postSubmitSituationView/${postId}`;
  // 在新标签页中打开 URL
  // router.push(url)
  window.open(url);
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
