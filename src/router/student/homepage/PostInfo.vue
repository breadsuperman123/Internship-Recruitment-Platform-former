<template>
  <div class="post-info" @click="navigateToPost" >
    <div class="info">
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
  background: linear-gradient(135deg, #87CEFA, #B0E0E6);
  border-radius: 10px;
  box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.2);
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  display: flex;
  align-items: center;
  height: 180px;
  padding: 10px;
  margin-bottom: 10px;
  display: flex;
}

.post-info:hover {
  transform: translateY(-5px);
  box-shadow: 0px 5px 20px rgba(0, 0, 0, 0.3);
}
.img{
  margin-top: 20px;
  margin-right: 30px;
  max-width: 100px;
  max-height: 80px;

}
.info {
  flex: 1;
  padding: 20px;
  color: black;
}

</style>
