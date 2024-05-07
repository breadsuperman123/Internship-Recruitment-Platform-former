<template>
  <a-layout>
    <!-- 头部菜单 -->
    <a-layout-header :style="{ position: 'fixed', zIndex: 1, width: '100%' }">
      <div class="logo" />
      <a-menu
          v-model:selectedKeys="selectedKeys"
          theme="dark"
          mode="horizontal"
          :style="{ lineHeight: '64px' }"
      >
        <a-menu-item key="1" @click="goToHomePage">首页</a-menu-item>
        <a-menu-item key="2">
          <a href="http://101.200.231.159:9002/">职位百科</a>
        </a-menu-item>
        <a-dropdown>
          <template v-slot:overlay>
            <a-menu style="width: 200px">
              <student-prim-page></student-prim-page>
            </a-menu>
          </template>
          <a-menu-item key="3">我的</a-menu-item>
        </a-dropdown>
        <a-menu-item key="4" @click="goToSearchPage">岗位搜索</a-menu-item>
      </a-menu>
    </a-layout-header>
    <a-layout-content :style="{paddingTop:'64px' }">
      <!-- 在这里使用 studentSearchInput 组件，并传入路由参数 -->
      <student-search-input :bigType="route.params.bigType" :smallType="route.params.smallType"></student-search-input>
    </a-layout-content>
    <!-- 第一个表单 -->
    <a-layout-content :style="{ marginTop: '64px' }">
      <div class="form-container">
        <a-form>
          <a-form-item name="实习区域" label="实习区域">
            <a-radio-group v-model:value="selectedRegion" @change="updateRequestParams()">
              <a-radio-button value="北京"  >北京</a-radio-button>
              <a-radio-button value=“上海” >上海</a-radio-button>
              <a-radio-button value="深圳" >深圳</a-radio-button>
              <a-radio-button value="杭州" >杭州</a-radio-button>
              <a-radio-button value="广州" >广州</a-radio-button>
              <a-radio-button value="其他" >其他</a-radio-button>
            </a-radio-group>
          </a-form-item>

          <a-form-item name="实习月份" label="实习月份">
            <a-radio-group v-model:value="selectedMonth" @change="updateRequestParams()">
              <a-radio-button value="一个月">一个月</a-radio-button>
              <a-radio-button value="三个月">三个月</a-radio-button>
              <a-radio-button value="三个月到六个月">三个月到六个月</a-radio-button>
              <a-radio-button value="六个月以上">六个月以上</a-radio-button>
            </a-radio-group>
          </a-form-item>

          <a-form-item name="日薪要求" label="日薪要求">
            <a-radio-group v-model:value="selectedSalary" @change="updateRequestParams()">
              <a-radio-button value="100">100</a-radio-button>
              <a-radio-button value="200">200</a-radio-button>
              <a-radio-button value="300">300</a-radio-button>
              <a-radio-button value="400">400</a-radio-button>
              <a-radio-button value="500">500</a-radio-button>


            </a-radio-group>
          </a-form-item>

          <!-- 按钮组对齐 -->
          <div style="text-align: right;">
            <a-button @click="clearFilters">清空</a-button>
          </div>
        </a-form>
      </div>
    </a-layout-content>

    <!-- 第二个表单 -->
    <a-layout-content :style="{ marginTop: '64px' }">
      <div class="form-container2">
        <a-form>
          <a-form-item name="排序方式" label="排序方式">
            <a-radio-group v-model:value="formState['排序方式']">
              <a-radio-button value="a" @click="showDefaultPost">默认</a-radio-button>
              <a-radio-button value="b" @click="showNewPost">最新</a-radio-button>
            </a-radio-group>
          </a-form-item>
        </a-form>
      </div>
    </a-layout-content>
    <a-layout-content :style="{ marginTop: '64px' }">
      <div>
        <NewPost v-if="selectedComponent === 'newPost'" />
        <PopularPost v-if="selectedComponent === 'popularPost'" />
      </div>
    </a-layout-content>
    <!-- 底部内容 -->
    <a-layout-footer :style="{ textAlign: 'center' }">
      <!-- 底部内容 -->
    </a-layout-footer>
  </a-layout>
</template>

<script lang="ts" setup>
import {onMounted, reactive, ref} from 'vue';
import StudentSearchInput from "@/router/student/homepage/StudentSearchInput.vue";
import { useRoute } from 'vue-router';
import PopularPost from "@/router/student/homepage/PopularPost.vue";
import NewPost from "@/router/student/homepage/NewPost.vue";
import axios from "axios";

const selectedKeys = ref<string[]>(['3']);
const formState = reactive<Record<string, any>>({
  'input-number': 3,
  'checkbox-group': ['A', 'B'],
  rate: 3.5,
});

onMounted(showDefaultPost);

import router from "@/router";
import StudentPrimPage from "@/router/student/homepage/StudentPrimPage.vue";

const route = useRoute();
function goToHomePage() {
  // 使用 router.push() 方法跳转到学生首页
  router.push({ name: 'studentHomePage' }); // 假设学生首页的路由名为 'studentHomePage'
}
// 打印要传递给 studentSearchInput 组件的路由参数
console.log('Route params in studentSearchPage:', route.params);

const selectedComponent = ref<string>('popularPost');

function showDefaultPost() {
  selectedComponent.value = 'popularPost';
  updateRequestParams();

}

function showNewPost() {
  selectedComponent.value = 'newPost';
  updateRequestParamsTime();
}

const selectedRegion = ref<string>('');
const selectedMonth = ref<string>('');
const selectedSalary = ref<string>('');

async function sendRequest(params: any) {
  const response = await axios.post('http://localhost:8081/sendFilter', {
    region:params.region,
    month:params.month,
    salary:params.salary,
    smallType:params.smallType,
  });
  const searchData = response.data;
  const searchDataString = JSON.stringify(searchData);

  // 获取当前路由参数
  const currentParams = { ...route.params };
  // 更新路由参数
  currentParams.searchData = searchDataString;
  // 使用 router.push() 更新路由参数
  await router.push({ params: currentParams });
  console.log(response);
}

function updateRequestParams() {
  selectedComponent.value = 'popularPost';
  const params = {
    region: selectedRegion.value,
    month: selectedMonth.value,
    salary: selectedSalary.value,
    smallType: route.params.smallType
  };
  console.log("发送的筛选组合为：",params)
  sendRequest(params);
}

function clearFilters() {
  // 使用 window.location.reload() 方法刷新页面
  window.location.reload();
}

//按最新时间排序
async function sendRequestTime(params: any) {
  const response = await axios.post('http://localhost:8081/sendFilterTime', {
    region:params.region,
    month:params.month,
    salary:params.salary,
    smallType:params.smallType,
  });
  const searchData = response.data;
  const searchDataString = JSON.stringify(searchData);

  // 获取当前路由参数
  const currentParams = { ...route.params };
  // 更新路由参数
  currentParams.searchData = searchDataString;
  // 使用 router.push() 更新路由参数
  await router.push({ params: currentParams });
  console.log(response);
}

function updateRequestParamsTime() {
  selectedComponent.value = 'newPost';
  const params = {
    region: selectedRegion.value,
    month: selectedMonth.value,
    salary: selectedSalary.value,
    smallType: route.params.smallType
  };
  console.log("发送的最新时间筛选组合为：",params)
  sendRequestTime(params);
}

function goToSearchPage(){
  router.push({ name: 'studentMainSearch',params: { searchValue: 'empty', searchData: JSON.stringify('') } }); // 假设学生首页的路由名为 'studentHomePage'
}

</script>

<style scoped>
/* 添加样式 */
.form-container {
  background-image: url('/public/搜索界面背景.png'); /* 添加背景图片 */
  background-size: cover; /* 让背景图片充满容器 */
  background-color: #ebebeb; /* 更深的灰色 */
  padding: 20px; /* 适当的内边距 */
  border-radius: 8px; /* 圆角边框 */
  width: 80%; /* 宽度为页面的80%，使其水平居中 */
  margin: 0 auto; /* 水平居中 */
  margin-bottom: 20px; /* 添加底部间距 */
  height: 450px; /* 增加容器高度 */
}
.form-container form {
  margin-top: 170px; /* 增加表单顶部间距 */
  margin-left: 100px;

}
.form-container2{
  background-image: url('/public/搜索界面表单2背景.png'); /* 添加背景图片 */
  background-size: cover; /* 让背景图片充满容器 */
  background-color: #ebebeb; /* 更深的灰色 */
  padding: 20px; /* 适当的内边距 */
  border-radius: 8px; /* 圆角边框 */
  width: 80%; /* 宽度为页面的80%，使其水平居中 */
  margin: 0 auto; /* 水平居中 */
  margin-bottom: 20px; /* 添加底部间距 */
  height: 340px; /* 增加容器高度 */
}
.form-container2 form{
  margin-top: 170px; /* 增加表单顶部间距 */
  margin-left: 100px;

}
</style>