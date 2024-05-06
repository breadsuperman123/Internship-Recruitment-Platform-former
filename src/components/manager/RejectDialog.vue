<template>
  <div>
    <a-button type="primary" @click="showModal" style="color: red; border: #ec0858">不通过</a-button>
    <a-modal v-model:open="open" title="Title" :confirm-loading="confirmLoading" @ok="handleOk">
      <p>{{ modalText }}</p>
    </a-modal>
  </div>
</template>

<script lang="ts" setup>
import { ref, defineProps , defineEmits} from 'vue';
import axios from 'axios';
import { message } from 'ant-design-vue'; // Import message from ant-design-vue
import router from "@/router";

const modalText = ref<string>('是否拒绝该企业注册？');
const open = ref<boolean>(false);
const confirmLoading = ref<boolean>(false);
const jwtToken = localStorage.getItem("jwtToken");

const props = defineProps({
  enterpriseId: Number
});

import instance from "@/axios-instance";

const showModal = () => {
  open.value = true;
};

const handleOk = async () => {
  confirmLoading.value = true;
  try {
    const response = await instance.post(`/approvalRegisterFirm`,{
      "enterprise": {
        "id": `${props.enterpriseId}`,
        "status": "已审核"
      },
      "status": "未通过",
    });
    if(response.data.code == 1){
      message.success("成功拒绝该申请！"); // 使用 message.success 显示成功提示
      emit('reject');
    }else{
      message.error("审核通过失败"); // 使用 message.error 显示失败提示
    }
  } catch (e) {
    message.error("出现错误"); // 使用 message.error 显示错误提示
  }
  modalText.value = '操作中...';
  setTimeout(() => {
    open.value = false;
    confirmLoading.value = false;
  }, 1000);
};

const emit = defineEmits(['reject']);
</script>
