<script setup lang="ts">
import {reactive, ref, onMounted} from 'vue';
import {useRoute} from "vue-router";
import axios from "axios";
import router from "@/router";
import DefaultPost from "@/router/student/homepage/DefaultMainPost.vue";
import NewPost from "@/router/student/homepage/NewMainPost.vue";
import StudentPrimPage from "@/router/student/homepage/StudentPrimPage.vue";
const route = useRoute();
const inputValue = ref<string>(''); // 初始化为空字符串
const formState = reactive<Record<string, any>>({
  'input-number': 3,
  'checkbox-group': ['A', 'B'],
  rate: 3.5,
});
const selectedKeys = ref<string[]>(['3']);
const selectedComponent = ref<string>('defaultPost');
function goToHomePage() {
  // 使用 router.push() 方法跳转到学生首页
  router.push({ name: 'studentHomePage' }); // 假设学生首页的路由名为 'studentHomePage'
}
function showDefaultMainPost() {
  selectedComponent.value = 'defaultPost';
  updateRequestParams();
}

function showNewMainPost() {
  selectedComponent.value = 'newPost';
  updateRequestParamsTime();
}
// 在组件加载时，检查是否存在上一个界面传入的搜索值，如果存在，则将其赋值给输入框的值
onMounted(() => {
    inputValue.value = route.params.searchValue;

});
//二次搜索更新路由
const onSearch = async (searchValue: string) => {
  try {
    // 发送搜索请求
    const response = await axios.post('http://localhost:8081/sendChildInput', { searchValue });
    const searchData = response.data;
    const searchDataString = JSON.stringify(searchData);

    // 获取当前路由参数
    const currentParams = { ...route.params };

    // 更新路由参数
    currentParams.searchValue = searchValue;
    currentParams.searchData = searchDataString;

    // 使用 router.push() 更新路由参数
    await router.push({ params: currentParams });
    // 刷新页面
    window.location.reload();

  } catch (error) {
    console.error('请求失败：', error);
  }
};

//筛选更新路由
const selectedRegion = ref<string>('');
const selectedMonth = ref<string>('');
const selectedSalary = ref<string>('');
async function sendRequest(params: any) {
  const response = await axios.post('http://localhost:8081/sendMainFilter', {
    region:params.region,
    month:params.month,
    salary:params.salary,
    input:params.input,
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
  selectedComponent.value = 'defaultPost';
  const params = {
    region: selectedRegion.value,
    month: selectedMonth.value,
    salary: selectedSalary.value,
    input:route.params.searchValue
  };
  console.log("发送的筛选组合为：",params)
  sendRequest(params);
}
//最新事件筛选
async function sendRequestTime(params: any) {
  const response = await axios.post('http://localhost:8081/sendMainFilterTime', {
    region:params.region,
    month:params.month,
    salary:params.salary,
    input:params.input,
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
  selectedComponent.value = 'defaultPost';
  const params = {
    region: selectedRegion.value,
    month: selectedMonth.value,
    salary: selectedSalary.value,
    input:route.params.searchValue
  };
  console.log("发送的筛选组合为：",params)
  sendRequestTime(params);
}

onMounted(showDefaultMainPost);
function clearFilters() {
  // 使用 window.location.reload() 方法刷新页面
  window.location.reload();
}
</script>

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
        </a-menu-item>             <a-dropdown>
          <template v-slot:overlay>
            <a-menu style="width: 200px">
              <student-prim-page></student-prim-page>
            </a-menu>
          </template>
          <a-menu-item key="3">我的</a-menu-item>
        </a-dropdown>      </a-menu>
    </a-layout-header>
    <a-layout-content :style="{paddingTop:'64px' }">
      <a-input-search
          v-model:value="inputValue"
          size="large"
          placeholder="请输入您心仪的实习岗位"
          enter-button
          @search="onSearch"
      />
    </a-layout-content>
    <!-- 第一个表单 -->
    <a-layout-content :style="{ marginTop: '64px',paddingLeft:'32px',paddingRight:'32px'}">
      <div class="form-container">
        <a-form>
          <a-form-item name="实习区域" label="实习区域">
            <a-radio-group v-model:value="selectedRegion" @change="updateRequestParams()">
              <a-radio-button value="北京" >北京</a-radio-button>
              <a-radio-button value="上海">上海</a-radio-button>
              <a-radio-button value="深圳">深圳</a-radio-button>
              <a-radio-button value="杭州">杭州</a-radio-button>
              <a-radio-button value="广州">广州</a-radio-button>
              <a-radio-button value="其他">其他</a-radio-button>

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
    <a-layout-content :style="{ marginTop: '64px' ,paddingLeft:'32px',paddingRight:'32px'}">
      <div class="form-container2">
        <a-form>
          <a-form-item name="排序方式" label="排序方式">
            <a-radio-group v-model:value="formState['排序方式']">
              <a-radio-button value="a" @click="showDefaultMainPost">默认</a-radio-button>
              <a-radio-button value="b" @click="showNewMainPost">最新</a-radio-button>
            </a-radio-group>
          </a-form-item>
        </a-form>
      </div>
    </a-layout-content>
      <a-layout-content :style="{ marginTop: '64px', paddingLeft:'64px',paddingRight:'64px'}">
        <div>
          <NewPost v-if="selectedComponent === 'newPost'" />
          <DefaultPost v-if="selectedComponent === 'defaultPost'" />
        </div>
      </a-layout-content>
    <!-- 底部内容 -->
    <a-layout-footer :style="{ textAlign: 'center' }">
      <!-- 底部内容 -->
    </a-layout-footer>
  </a-layout>
</template>

<style scoped>
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