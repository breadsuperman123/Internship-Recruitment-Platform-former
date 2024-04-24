<template>
  <a-layout>
      <div class="search-container">
        <a-input-search
            v-model:value="inputValue"
            size="large"
            placeholder="请输入您心仪的实习岗位"
            enter-button
            @search="onSearch"
        />
      </div>
  </a-layout>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import axios from "axios";
import router from "@/router";

const inputValue = ref<string>('');  // 使用 inputValue 用于双向绑定输入框的值

const route = useRoute();

// 监听路由参数的变化
watch(
    () => route.params,
    (params) => {
      // 如果路由参数中有大类和小类，则将它们拼接并赋给输入框的值
      inputValue.value = params.smallType;

    },
    { immediate: true }
);
// 打印接收到的路由参数
console.log('Received route params:', route.params);

const onSearch = async () => {
  // 使用 inputValue 变量进行搜索
  try {
    const searchValue=inputValue.value;
    // 发送搜索请求
    const response = await axios.post('http://localhost:8081/sendChildTypeInput', {searchValue});
    const searchData = response.data;
    const searchDataString = JSON.stringify(searchData);

    // 获取当前路由参数
    const currentParams = {...route.params};

    // 更新路由参数
    currentParams.searchValue = searchValue;
    currentParams.searchData = searchDataString;

    // 使用 router.push() 更新路由参数
    await router.push({name:"studentMainSearch",params: currentParams});
    console.log("搜索值",inputValue.value);
    console.log("参数",currentParams)
  } catch (error) {
    console.error('请求失败：', error);
  }
};
</script>

<style scoped>

.search-container a-input-search {
  width:100%;
  max-width: 100%; /* 防止搜索框宽度超过父容器 */
}

</style>
