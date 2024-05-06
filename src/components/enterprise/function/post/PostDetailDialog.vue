<template>
  <div id="components-modal-demo-position">
    <a-button type="primary" @click="handleButtonClick">
      编辑
    </a-button>
    <a-modal
        style="width: 650px; "
        v-model:open="modalVisible"
        title="岗位信息"
        centered
        @ok="closeDetailDialog"
    >
      <post-detail-form :clickNumbers="clickNums" :id="props.id" :postTypeName="props.postTypeName"></post-detail-form>
    </a-modal>
  </div>
</template>

<script lang="ts" setup>
import { ref, defineProps } from 'vue';
import PostDetailForm from "@/components/enterprise/function/post/PostDetailForm.vue";

const clickNums = ref(1)

const modalVisible = ref<boolean>(false);

const props = defineProps({
  id: Number,
  postTypeName:String
});


const handleButtonClick = () => {
  modalVisible.value = true;
  clickNums.value = clickNums.value + 1;
};



const closeDetailDialog = () => {
  modalVisible.value = false;
};


</script>
