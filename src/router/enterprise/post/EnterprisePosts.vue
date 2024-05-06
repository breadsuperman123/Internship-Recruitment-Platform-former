<template>
  <div class="container">
    <div class="search-form">

      <a-form @submit.prevent="searchPost">
        <a-form-item
            name="select-multiple"
            label="岗位类别"
            :rules="[{ required: false, message: '岗位类别!', type: 'array' }]"
        >
          <a-select
              v-model:value="selectedPostsType['select-multiple']"
              mode="multiple"
              placeholder="岗位类别"
          >
            <a-select-option v-for="category in jobCategories" :key="category" :value="category.value">
              {{ category }}
            </a-select-option>

          </a-select>
        </a-form-item>
        <a-form-item
            name="select-multiple"
            label="工作城市"
            :rules="[{ required: false, message: '工作城市!', type: 'array' }]"
        >
          <a-select
              v-model:value="selectedWorkCities['select-multiple']"
              mode="multiple"
              placeholder="工作城市"
          >
            <a-select-option v-for="city in workCities" :key="city" :value="city.value">
              {{ city }}
            </a-select-option>
          </a-select>
        </a-form-item>

        <a-form-item class="form-group" name="status" label="简历状态">
          <a-select class="form-control" v-model:value="status">
            <a-select-option value="招聘中">招聘中</a-select-option>
            <a-select-option value="停止招聘" style="color: red">停止招聘</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item style="text-align: center;">
          <a-button @click="searchPost" type="primary">筛选</a-button>
        </a-form-item>
      </a-form>
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
    </div>
  </div>
</template>

<script setup lang="ts">
import {onMounted} from 'vue';


const status = ref('')
const posts = ref([]) // 空数组

// 获取本地存储的jwtToken并将其添加到请求头中
const jwtToken = localStorage.getItem('jwtToken');
import instance from "@/axios-instance";

// 在页面加载完毕后发送请求
onMounted(() => {
  // 调用发送 GET 请求的方法，
  getEnterprisePost()
  getPostSmallType()
  getWorkCities()
});

import {defineProps, watch, reactive,ref} from 'vue';
const jobCategories = ref([]);
const workCities = ref([])
const getPostSmallType = async () => {
  try {
    // 获取所有岗位类别
    const response = await instance.get("/getPostSmallType");
    console.log(response.data.data)
    jobCategories.value = response.data.data; // 将岗位类别显示在下拉选择框
  } catch (e) {
    alert("岗位获取失败，出现异常！");
  }
};

const getWorkCities = async () => {
  try {
    // 获取所有岗位类别
    const response = await instance.get("/getPostWorkCities");
    console.log(response.data.data)
    workCities.value = response.data.data; // 将岗位类别显示在下拉选择框
  } catch (e) {
    alert("岗位获取失败，出现异常！");
  }
};
// 定义接收的事件
const props = defineProps({
  clickNumbers: Number,
  clickMenuOnes:Number
});


const selectedPostsType = reactive<Record<string, any>>({

});

const selectedWorkCities = reactive<Record<string, any>>({

});

// 使用watch监听props.clickNumbers的变化
watch(() => props.clickNumbers, (newVal: any, oldVal: any) => {
  // 当clickNumbers改变时，调用getPostSmallType
  if (newVal == "1") {
    getEnterprisePost();
  }
});

watch(() => props.clickMenuOnes, (newVal: any, oldVal: any) => {
  // 当clickNumbers改变时，调用getPostSmallType
  if (newVal != oldVal) {
    getEnterprisePost();
  }
});


const getEnterprisePost = async () => {
  try {
    console.log("岗位管理页面获取的jwt令牌：", jwtToken)
    const response = await instance.get("/getEnterprisePosts");
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
    console.log("postTypes:",selectedPostsType['select-multiple'])
    console.log("workCities:",selectedWorkCities['select-multiple'])
    console.log("status:",status.value)
    const response = await instance.post('/selectEnterprisePostsMultiple', {
      postTypes: selectedPostsType['select-multiple'],
      workCities: selectedWorkCities['select-multiple'],
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

const viewDelivery = (postId: any) => {
  window.open("/postSubmitSituationView", "_blank");
}
</script>


<!--css-->
<style scoped>
.container {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  max-width: 900px;
  margin: auto;
  padding: 20px;
  background-color: #f8f9fa;
}

.btn {
  padding: .375rem .75rem;
  font-size: .875rem;
  line-height: 1.5;
  border-radius: .25rem;
  transition: color .15s ease-in-out, background-color .15s ease-in-out, border-color .15s ease-in-out, box-shadow .15s ease-in-out;
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
