<template>
  <div class="post-info" @click="navigateToPost">
    <div>
    <h3>{{ post.name }}</h3>
    <p>薪资{{ post.pay }}/天</p>
    <p>{{ post.workCity}}</p>
    <p>{{ post.enterpriseName}}</p>
    </div>
    <img :src="post.logoUrl" alt="企业logo" class="img">
  </div>
</template>

<script setup lang="ts">
import {defineProps, onMounted} from 'vue';
import {useRoute, useRouter} from 'vue-router';

const props = defineProps({
  post: {
    type: Object,
    required: true,
  }
});

const route = useRoute();

import router from "@/router";
import axios from "axios";

const navigateToPost = async () => {
  try {
    const postName = props.post.id;
    const response = await axios.post(`http://localhost:8081/sendPostName`,{postName});
    const postData = response.data;
    const postDataString = JSON.stringify(postData);
    await router.push({
      name: 'specificPostInfo',
      params: {postName:postName, postData:postDataString} // 将 postName 和 postData 都作为 params 参数传递
    });

  } catch (error) {
    console.error('请求失败：', error);
  }
}

</script>

<style scoped>
.post-info {
  cursor: pointer;
  background-color: #f0f0f0;
  padding: 10px;
  border-radius: 5px;
  margin-bottom: 10px;
  display: flex;
}
.img{
  margin-top: 20px;
  margin-left: 100px;
  max-width: 100px;
  max-height: 80px;
}
</style>
