<template>
  <div class="demo-type" @click="handleClick">
    <div style="">
      <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"/>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineEmits } from 'vue';
import router from "@/router";
const emit = defineEmits(['click']);
const handleClick = () => {
  // Emit a click event when the avatar is clicked

  emit('click');
};
</script>


<style scoped>
.demo-type {
  display: flex;
}
.demo-type > div {
  flex: 1;
  text-align: center;
}

.demo-type > div:not(:last-child) {
  border-right: 1px solid var(--el-border-color);
}
</style>
