<template>
  <div class="centered-container">
    <a-form
        :model="formState"
        :label-col="layout.labelCol"
        :wrapper-col="layout.wrapperCol"
        name="nest-messages"
        :validate-messages="validateMessages"
    >
      <a-form-item
          v-bind="layout"
      >                                                            <!--@headUrlUploaded="updateDepartmentHeadUrl"-->
        <department-head :isSubmitClicked="isSubmitClicked" :departmentHeadUrl="formState.headUrl" :isClickDepartment="props.isClickDepartment" ></department-head>
      </a-form-item>
      <a-form-item label="部门名称" :rules="[{ required: true }]">
        <a-input v-model:value="formState.department" />
      </a-form-item>
      <a-form-item label="用户名" :rules="[{ required: true }]">
        <a-input v-model:value="formState.username" />
      </a-form-item>
      <a-form-item label="电话" :rules="[{ required: true }]">
        <a-input v-model:value="formState.phone" />
      </a-form-item>
      <a-form-item  label="Email" :rules="[{ type: 'email' }]">
        <a-input v-model:value="formState.email" />
      </a-form-item>

      <a-form-item :wrapper-col="{ ...layout.wrapperCol, offset: 8 }">
        <a-button type="primary" html-type="submit" @click="clickUpdateDepartmentInfo">提交修改</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script lang="ts" setup>
import DepartmentHead from "@/components/enterprise/department/DepartmentHead.vue";
const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const validateMessages = {
  required: '${label} is required!',
  types: {
    email: '${label} is not a valid email!',
    number: '${label} is not a valid number!',
  },
  number: {
    range: '${label} must be between ${min} and ${max}',
  },
};

const formState = ref({
  username: '',
  phone: '',
  email: '',
  department: '',
  headUrl:''
});

const isSubmitClicked=ref(false)

import instance from "@/axios-instance";
import {ref,onMounted} from "vue"

const clickUpdateDepartmentInfo = async () =>{
  // isSubmitClicked.value = !isSubmitClicked.value
  // if(tempHeadUrl.value==null || tempHeadUrl.value==''){
  //   console.log("tempHeadUrl.value is empty:")
  //   console.log("tempHeadUrl.value:",tempHeadUrl.value)
  //   return;
  // }
  await onFinish()
}

const onFinish = async () => {
  try { const response = await instance.post("/updateDepartmentInfo", {
    username: formState.value.username,
    phone: formState.value.phone,
    email: formState.value.email,
    department: formState.value.department,
    // headUrl: tempHeadUrl.value
  })

    if (response.data.code == 0) {
      message.error(response.data.data)
      return;
    }
    console.log("部门信息更新响应数据：", response.data)
    console.log("更新后的表单数据，formState.value ：", formState.value)
    message.success("Update success!")

    formState.value.headUrl=tempHeadUrl.value;
  } catch (e) {
    console.log("error taking while request!")
  }
};

const getDepartmentInfo = async () =>{
  try {
    const response = await instance.get("/getDepartmentInfo")
    if(response.data.code==0){
      message.error(response.data.data)
      return;
    }
    formState.value = response.data.data;
    message.success("Get department info success!")
  }catch (e){
    message.error("Catch error, Get department info error!")
  }
}

onMounted(() => {
  // 调用发送 GET 请求的方法，
  getDepartmentInfo()
});
const tempHeadUrl = ref("")
// const updateDepartmentHeadUrl = (headUrl:any)=>{
//   console.log("父组件捕获子组件上传头像后返回的url:", headUrl);
//   tempHeadUrl.value = headUrl
//   console.log("父组件捕获子组件上传头像后赋值给formState的url:", tempHeadUrl.value)
// }

import {message} from "ant-design-vue";

import {defineProps, watch} from 'vue';

// 定义接收的事件
const props = defineProps({
  clickNumbers: Number,
  isClickDepartment:Boolean
});

// 使用watch监听props.clickNumbers的变化
watch(() => props.clickNumbers, (newVal: any, oldVal: any) => {
  // 当clickNumbers改变时，调用getPostSmallType
  if (newVal == "4.1") {
    console.log("watch click:", newVal.value)
    getDepartmentInfo();
  }
});

watch(() => props.isClickDepartment, (newVal: any, oldVal: any) => {
  // 当clickNumbers改变时，调用getPostSmallType
  if (newVal != oldVal) {
    console.log("watch click,new val:: ", newVal)
    console.log("watch click,old val:: ", oldVal)
    getDepartmentInfo();
  }
});

</script>

<style scoped>
.centered-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh; /* 调整高度以适应您的需求 */
}
</style>
