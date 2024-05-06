<template>
  <div class="select-container">
    <a-space direction="vertical" style="width: 100%">
      <h2>请选择你的意向岗位{{ maxTagCount }}</h2>
      <a-select
          v-model:value="value"
          mode="multiple"
          style="width: 100%"
          placeholder="Select Item..."
          :max-tag-count="maxTagCount"
          :options="options"
          @mouseenter="isHovered = true"
          @mouseleave="isHovered = false"
          size="large"
      >
        <template #maxTagPlaceholder="omittedValues">
          <span style="color: red">+ {{ omittedValues.length }} ...</span>
        </template>
      </a-select>
      <a-button
          type="primary"
          @click="handleConfirm"
          :style="{ transform: isClicked ? 'scale(0.95)' : '' }"
          @mousedown="isClicked = true"
          @mouseup="isClicked = false"
          class="blue-button"
      >
        Confirm
      </a-button>
    </a-space>
  </div>
</template>

<script setup>
import {ref, onMounted} from 'vue';
import axios from 'axios';
import {useRouter} from 'vue-router';

const selectedKeys = ref([]);
const value = ref([]);
const router = useRouter();
const options = ref([]);
const isHovered = ref(false);
const isClicked = ref(false);

const fetchData = async () => {
  try {
    const bigPostTypesResponse = await axios.get('http://localhost:8081/bigPostTypes');
    const bigPostTypes = bigPostTypesResponse.data;

    const smallPostTypesResponse = await axios.get('http://localhost:8081/smallPostTypes');
    const smallPostTypes = smallPostTypesResponse.data;

    options.value = buildOptions(bigPostTypes, smallPostTypes);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

const buildOptions = (bigPostTypes, smallPostTypes) => {
  const optionsList = [];

  bigPostTypes.forEach(bigType => {
    const option = {
      label: bigType.name,
      value: bigType.name,
      children: []
    };

    const correspondingSmallTypes = smallPostTypes.filter(smallType => smallType.bigName === bigType.name);

    correspondingSmallTypes.forEach(smallType => {
      option.children.push({
        label: smallType.smallName,
        value: smallType.smallName
      });
    });

    optionsList.push(option);
  });

  return optionsList;
};

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
const handleConfirm = async () => {
  try {
    const data=JSON.stringify(value.value);
    // 向后端发送选项值
    const response = await instance.post('http://localhost:8081/selectedValues', { selectedValues: data });
    console.log("所选意向岗位：",value);
    window.location.reload();
  } catch (error) {
    console.error('Error sending selected values:', error);
  }
};

onMounted(() => {
  fetchData();
});
</script>

<style scoped>
.select-container {
  margin: 20px;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 5px;
  background-color: #f5f5f5;
  transition: box-shadow 0.3s ease;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.select-container:hover {
  box-shadow: 0 8px 12px rgba(0, 0, 0, 0.2);
}

.a-button {
  transition: transform 0.3s ease;
}

.blue-button {
  background-color: blue;
  border-color: blue;
}
</style>
