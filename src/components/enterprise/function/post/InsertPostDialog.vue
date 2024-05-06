<template>
  <div id="components-modal-demo-position">
    <a-button type="primary" @click="handleButtonClick">
      发布岗位
    </a-button>
    <a-modal
        style="width: 650px; "
        v-model:open="modalVisible"
        title="岗位信息"
        centered
        @ok="closeDetailDialog"
    >
      <insert-post-form :clickNumbers="clickNums"></insert-post-form>
    </a-modal>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import InsertPostForm from "@/components/enterprise/function/post/InsertPostForm.vue";
const clickNums = ref(1)

const modalVisible = ref<boolean>(false);


const handleButtonClick = () => {
  modalVisible.value = true;
  clickNums.value = clickNums.value + 1;
};



const closeDetailDialog = () => {
  modalVisible.value = false;
};


</script>
