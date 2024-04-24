<template>
  <div class="post-info" @click="navigateToPost">
    <h3>{{ post.name }}</h3>
    <p>{{ post.description }}</p>
    <p>薪资{{ post.pay }}/天</p>
    <p>{{ post.workCity}}</p>
    <p>{{ post.enterpriseName}}</p>
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

const navigateToPost = () => {
  // 使用编程式导航跳转到post页面，并将postname作为路由参数传递
  router.push({ name: 'specificPostInfo', params: { postName:props.post.name} });

}
</script>

<style scoped>
.post-info {
  cursor: pointer;
  background-color: #f0f0f0;
  padding: 10px;
  border-radius: 5px;
  margin-bottom: 10px;
}
</style>
