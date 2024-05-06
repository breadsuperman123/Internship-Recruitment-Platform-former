<template>
  <div>
    <!--    <div class="header" style="background-color: #007bff">-->
    <!--      <hr-home-header @click="toggleMenu" style="margin-right: 15px;"></hr-home-header>-->
    <!--    </div>-->
    <div class="header" style="background-color: #007bff">
      <!-- 使用 el-dropdown 创建下拉菜单 -->
      <el-dropdown @command="handleCommand">
    <span class="el-dropdown-link">
      <hr-home-header @click="toggleMenu" style="margin-right: 15px;"></hr-home-header>
    </span>
        <!-- 使用 <template> 标签和 #dropdown 指定命名插槽 -->
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item command="openProfile">公司主页</el-dropdown-item>
            <el-dropdown-item command="department">部门信息</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>


    <div class="content-container">
      <div class="menu-container">
        <hr-function-menu @menuSelected="handleMenuSelected"></hr-function-menu>
      </div>
      <div class="main-content">
        <div v-show="isMenu1" class="post-management-container">
          <post-management :clickNumbers="currentMenuKey" :clickMenuOnes="clickMenuOneNums"></post-management>
        </div>
        <div v-if="isMenu21" class="content">
          <resume-approval-management :clickNumbers="currentMenuKey" :isClickApprovalRecord="isClickApprovalRecord"></resume-approval-management>
        </div>
        <div v-else-if="isMenu22" class="content">
          <resume-submit-management :clickNumbers="currentMenuKey" :isClickSubmitRecord="isClickSubmitRecord"></resume-submit-management>
        </div>
        <div v-else-if="isMenu3" class="content">
          <chat-home class="chat-home-fixed" :clickNumbers="currentMenuKey" :isClickTalentExplore="isClickTalentExplore"></chat-home>
        </div>
        <div v-else-if="isMenu41" style="margin-right: 50px;align-content: center">
          <department-informantion :clickNumbers="currentMenuKey" :isClickDepartment="isClickDepartment"></department-informantion>
        </div>
        <div v-else-if="isDefault" class="content">
          <post-management :clickNumbers="currentMenuKey"></post-management>
        </div>
      </div>
    </div>
    <a-layout-footer :style="footerStyle">
      <h5>实习徒企业后台管理！</h5>
    </a-layout-footer>
  </div>
</template>

<script setup lang="ts">
import type {CSSProperties} from 'vue';
import {ref, computed} from 'vue';
import HrHomeHeader from "@/components/enterprise/home/HrHomeHeader.vue";
import HrFunctionMenu from "@/components/enterprise/home/HrFunctionMenu.vue";
import PostManagement from "@/components/enterprise/function/post/PostManagement.vue";
import ResumeSubmitManagement from "@/components/enterprise/function/resume/ResumeSubmitManagement.vue";
import ResumeApprovalManagement from "@/components/enterprise/function/resume/ResumeApprovalManagement.vue";
import ChatHome from "@/components/enterprise/function/chat/ChatHome.vue";

const showMenu = ref(true);
const currentMenuKey = ref('');

// 引入 Element UI 的 Dropdown 组件
import {ElDropdown, ElDropdownMenu, ElDropdownItem} from 'element-plus';
import DepartmentInformantion from "@/components/enterprise/department/DepartmentInformantion.vue";

const handleCommand = (command: string) => {
  if (command === 'openProfile') {
    // 在新标签页中打开企业主页
    window.open('/enterpriseHome', '_blank');
  }else if(command==='department'){
    // 打开部门信息

  }
  // 其他命令的处理...
};


const toggleMenu = () => {
  showMenu.value = !showMenu.value;
  // return window.open("/enterpriseHome");
};

const clickMenuOneNums = ref(1)
const isClickDepartment = ref(false)
const isClickSubmitRecord = ref(false)
const isClickTalentExplore = ref(false)
const isClickApprovalRecord = ref(false)

const handleMenuSelected = (selectedItem: any) => {
  currentMenuKey.value = selectedItem.key;
  if (currentMenuKey.value == "1") {
    clickMenuOneNums.value = clickMenuOneNums.value + 1;
  }
  if (currentMenuKey.value == "4.1") {
    console.log("before click:",isClickDepartment.value)
    isClickDepartment.value = !isClickDepartment.value
    console.log("after click:",isClickDepartment.value)
  }
  if (currentMenuKey.value == "2.1") {
    isClickApprovalRecord.value = !isClickApprovalRecord.value
  }
  if (currentMenuKey.value == "2.2") {
    isClickSubmitRecord.value = !isClickSubmitRecord.value
  }
  if (currentMenuKey.value == "3") {
    isClickTalentExplore.value = !isClickTalentExplore.value
  }

};

const isMenu1 = computed(() => currentMenuKey.value == '1');
const isMenu21 = computed(() => currentMenuKey.value == '2.1');
const isMenu22 = computed(() => currentMenuKey.value == '2.2');
const isMenu3 = computed(() => currentMenuKey.value == '3');
const isMenu41 = computed(() => currentMenuKey.value == '4.1');
const isDefault = computed(() => !isMenu1.value && !isMenu21.value && !isMenu22.value && !isMenu3.value && !isMenu41.value);

const footerStyle: CSSProperties = {
  position: 'fixed',
  bottom: '0',
  left: '0',
  right: '0',
  textAlign: 'center',
  color: '#fff',
  height: '30px',
  lineHeight: '30px',
  backgroundColor: '#7dbcea',
  zIndex: '1000',
};

</script>

<style scoped>
.header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: flex-end;
  border-bottom: 1px solid #0a0a0a;
  background-color: #ffffff;
  z-index: 1000;
}

.content-container {
  display: flex;
  margin-top: 64px;
}

.menu-container {
  position: fixed;
  top: 64px;
  bottom: 30px; /* Adjusted to include space for footer */
  left: 0;
  width: 300px; /* Adjust the width as needed */
  border-right: 1px solid #ccc;
  padding-right: 20px;
  overflow-y: auto;
}

.chat-home-fixed {
  position: fixed;
  top: 72px;
  left: 365px;
}

.main-content {
  margin-left: 200px; /* Adjust margin to match menu width */
  flex: 1;
  display: flex;
  flex-direction: column;
}

.post-management-container {
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
}

.content {
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
}
</style>
