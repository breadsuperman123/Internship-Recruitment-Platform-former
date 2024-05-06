<template>
  <div class="components-page-header-demo-content">
    <a-page-header
        :title=enterprise.name
        class="site-page-header"
        :sub-title=enterprise.department
        :avatar="{src: enterprise.logoUrl}"
    >
      <template #extra>
        <a-button key="1" type="primary" @click="changeFirmInfo">EnterpriseHome</a-button>
      </template>
      <a-row class="content">
        <div style="flex: 1">
          <h4>公司地址：{{enterprise.address}}</h4>
          <h4>统一社会信用代码：{{enterprise.creditCode}}</h4>
          <p>
            企业简介：{{enterprise.description}}
          </p>
        </div>
        <div class="image" style="display: flex; justify-content: flex-end;">
            <img :src="enterprise.logoUrl" alt="企业Logo" style="width: 15%;"/>
        </div>
      </a-row>
    </a-page-header>
  </div>
</template>


<script lang="ts" setup>
import {ref,onMounted} from "vue";
const enterprise = ref({
  id:'',
  name:"企业名称",
  address:"公司地址",
  description:"",
  logoUrl:"",
  creditCode:"",
  department:"",
})

import instance from "@/axios-instance";
import {message} from "ant-design-vue";

onMounted(() => {
  // 调用发送 GET 请求的方法，获取数据并更新 pendingData 或 approvedData
  getEnterpriseInfo();
});
const getEnterpriseInfo = async() =>{
  // 获取企业信息
  const response = await instance.post("/getFirmInfo",{
    id:1
  })
  console.log("response.data:",response.data)
  if(response.data.code==0){
    message.error("Get firm information error!");
    return;
  }
  enterprise.value = response.data.data[0]
  message.success("Get firm information success!")
}
const changeFirmInfo = async() =>{
  // 企业信息变更

}
</script>


<style scoped>
#components-page-header-demo-content .image {
  margin: 0 0 0 60px;
  display: flex;
  align-items: center;
}

#components-page-header-demo-content .ant-page-header-rtl .image {
  margin: 0 60px 0 0;
}

#components-page-header-demo-content .content p {
  margin-bottom: 1em;
  color: rgba(0, 0, 0, 0.85);
  overflow-wrap: break-word;
}

@media (max-width: 768px) {
  #components-page-header-demo-content .image {
    flex: 100%;
    margin: 24px 0 0;
  }
}
</style>
