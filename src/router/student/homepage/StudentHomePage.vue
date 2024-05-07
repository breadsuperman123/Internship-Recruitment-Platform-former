<template>
  <a-space direction="vertical" :style="{ width: '100%', height: '100vh' }">
  <a-layout>
    <a-layout-header class="header">
      <div class="logo" />
      <a-menu
          v-model:selectedKeys="selectedKeys1"
          theme="dark"
          mode="horizontal"
          :style="{ lineHeight: '64px' }"
      >
        <a-menu-item key="1" @click="goToHomePage">首页</a-menu-item>
        <a-menu-item key="2">
          <a href="http://101.200.231.159:9002/">职位百科</a>
        </a-menu-item>
        <a-dropdown>
          <template v-slot:overlay>
            <a-menu style="width: 200px">
              <student-prim-page></student-prim-page>
            </a-menu>
          </template>
          <a-menu-item key="3">我的</a-menu-item>
        </a-dropdown>
        <a-menu-item key="4" @click="goToSearchPage">岗位搜索</a-menu-item>
      </a-menu>
    </a-layout-header>
    <img src="/slogan.png" alt="slogan" style="width: 100%;">
    <a-layout :style="{paddingLeft:'50px',paddingRight:'50px',paddingTop:'24',paddingBottom:'24px'}">
      <a-layout-sider width="200" style="background: #fff">
        <post-type></post-type>
      </a-layout-sider>

      <a-layout-content :style="{ background: '#fff',  marginLeft:'200px', minHeight: '280px' }">
        <student-rearch></student-rearch>
        <student-intend-post></student-intend-post>
      </a-layout-content>
    </a-layout>
    <a-layout-content :style="{contentStyle,paddingLeft:'50px',paddingRight:'50px'}">
      <recommand-post-archor></recommand-post-archor>
    </a-layout-content>

    <a-layout-footer :style="footerStyle" @click="gotoMainSearch">更多岗位</a-layout-footer>
  </a-layout>
  </a-space>
</template>
<script lang="ts" setup>
import {type CSSProperties, ref} from 'vue';
import PostType from "@/router/student/homepage/postType.vue";
import StudentRearch from "@/router/student/homepage/StudentRearch.vue";
import RecommandPostArchor from "@/router/student/homepage/RecommandPostArchor.vue";
import StudentPrimPage from "@/router/student/homepage/StudentPrimPage.vue";
import router from "@/router";
import StudentIntendPost from "@/router/student/homepage/StudentIntendPost.vue";
const selectedKeys1 = ref<string[]>(['1']);
ref<string[]>(['1']);
function goToHomePage() {
  // 使用 router.push() 方法跳转到学生首页
  router.push({ name: 'studentHomePage' }); // 假设学生首页的路由名为 'studentHomePage'
}

function goToSearchPage(){
  router.push({ name: 'studentMainSearch',params: { searchValue: 'empty', searchData: JSON.stringify('') } }); // 假设学生首页的路由名为 'studentHomePage'
}
const contentStyle: CSSProperties = {
  textAlign: 'center',
  minHeight: '120px',
  lineHeight: '120px',
  color: '#fff',
  backgroundColor: '#108ee9',
};

const footerStyle: CSSProperties = {
  textAlign: 'center',
  color: '#fff',
  backgroundColor: '#7dbcea',
};
function gotoMainSearch(){
  router.push({ name: 'studentMainSearch',params: { searchValue: 'empty', searchData: JSON.stringify('') } }); // 假设学生首页的路由名为 'studentHomePage'
}


</script>
<style scoped>

</style>