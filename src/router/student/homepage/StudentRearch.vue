<script setup lang="ts">
import {type CSSProperties, ref} from 'vue';
import axios from "axios";
import {useRouter} from "vue-router";
const router = useRouter();

const value = ref<string>('');

const onSearch = async (searchValue: string) => {
  try {
    const trimmedSearchValue = searchValue.trim();
    if (trimmedSearchValue !== '') { // 检查输入框是否有内容
      const response = await axios.post('http://localhost:8081/sendInput', { searchValue: trimmedSearchValue });
      const searchData = response.data;
      const searchDataString = JSON.stringify(searchData);
      await router.push({ name: 'studentMainSearch', params: { searchValue: trimmedSearchValue, searchData: searchDataString } });
    } else {
      console.error('搜索值不能为空');
      await router.push({ name: 'studentMainSearch', params: { searchValue: 'empty', searchData: JSON.stringify('') } }); // 将默认值作为参数传递给路由
    }
  } catch (error) {
    console.error('请求失败：', error);
  }
};


const contentStyle: CSSProperties = {
  textAlign: 'center',
  minHeight: '120px',
  lineHeight: '120px',
  color: '#fff',
  backgroundColor: '#108ee9',
};

</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column; /* 垂直排列 */
  height: auto;
}

.search-container,
.image-container {
  flex-grow: 1; /* 平分容器高度 */
  width: 100%; /* 宽度100% */
}

.search-container a-input-search {
  width:100%;
  max-width: 100%; /* 防止搜索框宽度超过父容器 */
}

.image-container img {
  width: 100%; /* 保持原始宽度 */
  height: 536px; /* 保持原始高度 */
  max-width: 100%; /* 图片宽度不超过父容器 */
}

</style>


<template>
  <a-layout>
    <div class="container">
      <div class="search-container">
        <a-input-search
            v-model:value="value"
            placeholder="请输入您感兴趣的岗位"
            enter-button
            @search="onSearch"
            size="large"
        />
      </div>
      <a-layout-content :style="contentStyle">
        <div class="image-container">
          <img src="/广告.gif" alt="广告">
        </div>
      </a-layout-content>
    </div>
  </a-layout>
</template>


