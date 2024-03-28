<template>
  <div id="components-modal-demo-position">
    <a-button type="primary" @click="showDetailDialog">
      {{ enterpriseId }}
    </a-button>
    <a-modal
        v-model:open="modalVisible"
        title="企业详细信息"
        centered
        @ok="closeDetailDialog"
    >
      <p>{{ enterpriseData.id }}</p>
      <p>{{ enterpriseData.name }}</p>
      <p>{{ enterpriseData.address }}</p>
      <p>{{ enterpriseData.creditCode }}</p>
      <p>{{ enterpriseData.description }}</p>
      <p>{{ enterpriseData.logoUrl }}</p>
    </a-modal>
  </div>
</template>

<script lang="ts" setup>
import { ref, defineProps } from 'vue';
import axios from "axios";

const props = defineProps({
  enterpriseId: String
});

const modalVisible = ref<boolean>(false);
const jwtToken = localStorage.getItem("jwtToken");

const enterpriseData = ref({
  id: '',
  name: '',
  address: '',
  description: '',
  logoUrl: '',
  creditCode: '',
});

const showDetailDialog = async () => {
  modalVisible.value = true;
  console.log("jwt:", jwtToken);
  try {
    const response = await axios.post("http://localhost:8081/enterpriseDetail", {
      enterpriseId: props.enterpriseId
    },{
      headers: {
        token: jwtToken
      },
    });
    enterpriseData.value = response.data;
  } catch (error) {
    console.error("Error fetching enterprise detail:", error);
  }
};

const closeDetailDialog = () => {
  modalVisible.value = false;
};
</script>
