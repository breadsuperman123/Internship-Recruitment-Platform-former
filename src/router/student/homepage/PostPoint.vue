<script setup lang="ts" >
import {CSSProperties, defineProps} from "vue";

const contentStyle: CSSProperties = {
  textAlign: 'center',
  minHeight: 120,
  lineHeight: '120px',
  color: '#fff',
  backgroundColor: '#f0f8ff',
  maxWidth:'830px'
};

const siderStyle: CSSProperties = {
  textAlign: 'center',
  lineHeight: '120px',
  color: '#fff',
  backgroundColor: "#f5f5f5",//浅灰色和网页背景一样
  maxWidth:'800px'

};

const props = defineProps({
  post: {
    type: Object,
    required: true
  }
});
</script>

<template>
  <a-layout>
    <a-layout-content :style="contentStyle">
      <div class="description-box">
      <strong class="left" style="font-size: 25px;color: #0f100f">职位描述：</strong>
      <div style="color: #606266;font-size: 18px">{{ post.description }}</div>
      </div>
      <div class="demand-box">
      <strong class="left" style="color: #0f100f;font-size: 25px">职位要求：</strong>
      <div style="color: #606266;font-size: 18px">{{ post.demand }}</div>
      </div>
    </a-layout-content>
    <a-layout-sider :style="siderStyle">
      <div class="enterpriseInfo">
        <strong class="title">公司简介</strong>
        <div class="adjust">
        <div style="padding-left: 30px;padding-right: 10px">
        <h3>{{ post.enterpriseName }}</h3>
        </div>
          <img :src="post.logoUrl" alt="企业logo">
        </div>
        <p class="demand-box-info">{{ post.enterpriseDescription }}</p>
        <p style="margin-right: 30px;line-height: 2 ;font-size: 20px"><img src="/地址logo.png" alt="地址logo" class="address-logo">{{ post.address }}</p>
      </div>
    </a-layout-sider>
  </a-layout>
</template>

<style scoped>
.description-box,
.demand-box{
  background-color: #fff;
  margin-top: 40px ;
  margin-bottom:10px; /* 调整内边距，增加上下间距 */
  margin-left: 40px;
  margin-right: 40px;
  color: #000;
  text-align: left;
  padding-left: 10px;
  padding-top:10px;
  padding-right: 10px;
  font-size: 20px;
}
.demand-box{
  margin-top: 100px;
}
.enterpriseInfo {
  background-color: #fff;
  color: #000;
  text-align: left;
  padding-left: 40px;
  font-size: 20px;
  width: 500px;
  height: 100%;

}

.title {
  font-size: 25px;
}

/* 调整文本对比度和行距 */
.description-box,
.demand-box {
  line-height: 2; /* 调整行距 */
}


/* 调整图片样式 */
.enterpriseInfo img {
  width: 260px;
  height: 200px;
  margin: 10px;
}

.adjust{
  margin-right: 40px;
  background-color: #f5f5f5;
  display: flex; /* Enable flexbox layout */
  white-space: nowrap; /* 防止文本换行 */

}


.address-logo {
  max-width: 40px;
  max-height: 40px;
  margin-right: 60px;
}
.demand-box-info{
  background-color: #fff;
  color: #606266;
  text-align: left;
  font-size: 15px;
  line-height: 2; /* 调整行距 */
  margin-right: 30px;
}

</style>