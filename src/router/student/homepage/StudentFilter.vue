<script setup lang="ts">
import {useRoute} from "vue-router";
import axios from "axios";
import router from "@/router";
import {ref, onMounted, watch, reactive} from 'vue';
import { defineProps } from 'vue';

const props = defineProps({
  enterpriseInfo: {
    type: Object,
    required: true,
  },
});

const route = useRoute();

//筛选更新路由
const selectedRegion = ref<string>('');
const selectedMonth = ref<string>('');
const selectedSalary = ref<string>('');
async function sendRequest(params: any) {
  const response = await axios.post('http://localhost:8081/sendFilterEnterprise', {
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
  const params = {
    region: selectedRegion.value,
    month: selectedMonth.value,
    salary: selectedSalary.value,
    input:props.enterpriseInfo.value.name
  };
  console.log("发送的筛选组合为：",params)
  sendRequest(params);
}

async function clearFilters() {
  try {
    const input = props.enterpriseInfo.value.name
    const response = await axios.post("http://localhost:8081/sendOnlyEnterprise", {input});
    const searchData = response.data;
    const searchDataString = JSON.stringify(searchData);

    // 获取当前路由参数
    const currentParams = { ...route.params };
    // 更新路由参数
    currentParams.searchData = searchDataString;
    // 使用 router.push() 更新路由参数
    await router.push({ params: currentParams });
    console.log(response);
  } catch (error) {
    console.error('Error while fetching enterprise info:', error);

  }
}
</script>

<template>
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
</template>

<style scoped>
.form-container {
  //background-image: url('/public/搜索界面背景.png'); /* 添加背景图片 */
  background-size: cover; /* 让背景图片充满容器 */
  background-color: #ebebeb; /* 更深的灰色 */
  padding: 50px; /* 适当的内边距 */
  border-radius: 8px; /* 圆角边框 */
  width: 100%; /* 宽度为页面的80%，使其水平居中 */
  margin: 0 auto; /* 水平居中 */
  margin-bottom: 20px; /* 添加底部间距 */
}

</style>