<template>
  <div class="demo-type" @click="handleClick">
    <div style="">
      <el-avatar :src='hrHeadUrl' >
      </el-avatar>
    </div>
  </div>
</template>

<script setup lang="ts">
import {defineEmits, onMounted,ref} from 'vue';
import {message} from "ant-design-vue";

import instance from "@/axios-instance";
const emit = defineEmits(['click']);
const handleClick = () => {
  // Emit a click event when the avatar is clicked
  emit('click');
};

const hrHeadUrl = ref("")
onMounted(()=>{
  getHeadLogoUrl()
});

const getHeadLogoUrl = async() =>{
  try{
    const response = await instance.get("/getHeadLogoUrl")
    if(response.data.code==0){
      message.error(response.data.data)
      return;
    }
    hrHeadUrl.value = response.data.data;
  }catch (e){
    message.error("catch error!")
  }
}


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
