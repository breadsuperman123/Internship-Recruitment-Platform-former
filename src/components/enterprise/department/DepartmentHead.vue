<template>
  <div class="upload-container">
    <a-upload
        v-model:fileList="fileList"
        action="http://localhost:8081/test"
        list-type="picture-card"
        @preview="handlePreview"
        :before-upload="beforeUpload"
        :on-remove="handleRemove"
        :max-size="5 * 1024"
    >
    <div v-if="fileList.length === 0">
      <plus-outlined />
      <div class="upload-text">Upload</div>
    </div>
    </a-upload>
    <a-modal :open="previewVisible" :title="previewTitle" :footer="null" @cancel="handleCancel">
      <img alt="example" style="width: 100%" :src="previewImage" />
    </a-modal>
  </div>
  <div>
    <img alt="example" style="width: 50%;height: 32%" :src="headUrl" />
  </div>
  <div>上传/更换头像</div>
  <div><button style="color: #1f56ce" @click="uploadFile">确认上传</button></div>
</template>

<script lang="ts" setup>
import { PlusOutlined } from '@ant-design/icons-vue';
import {ref, watch, defineProps, defineEmits, onMounted} from 'vue';
import { message, UploadProps } from 'ant-design-vue';
import axios from "axios";
import instance from "@/axios-instance";

function getBase64(file: File) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}

const previewVisible = ref(false);
const previewImage = ref('');
const previewTitle = ref('');
const headLogoFile = ref(null);

const fileList = ref<UploadProps['fileList']>([]);

const handleCancel = () => {
  previewVisible.value = false;
  previewTitle.value = '';
};

const handlePreview = async (file: UploadProps['file']) => {
  if (!file.url && !file.preview) {
    file.preview = (await getBase64(file.originFileObj)) as string;
  }
  previewImage.value = file.url || file.preview;
  previewVisible.value = true;
  previewTitle.value = file.name || file.url.substring(file.url.lastIndexOf('/') + 1);
};

const beforeUpload = (newFile: File) => {
  const isJpgOrPng = newFile.type === 'image/jpeg' || newFile.type === 'image/png';
  if (!isJpgOrPng) {
    message.error('You can only upload JPG/PNG file!');
    return false;
  }
  const isLt5M = newFile.size / 1024 / 1024 < 5; // 限制文件大小为 5MB
  if (!isLt5M) {
    message.error('Image must be smaller than 5MB!');
    return false;
  }
  headLogoFile.value = newFile;
  return false; // Allow default upload behavior
};

const handleRemove = (file: UploadProps['file']) => {
  fileList.value = fileList.value.filter(f => f !== file); // Remove the file from fileList
};

const uploadFile = async () =>{
  try {
    console.log("headLogoFile.value",headLogoFile.value)
    if(headLogoFile.value==null || headLogoFile.value==""){
      message.warn("headLogoFile.value is null or empty!")
      return
    }
    const response = await instance.post("http://localhost:8081/upload",{
      file: headLogoFile.value
    },{
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    if(response.data.code==0){
      message.error(response.data.data)
    }

    headUrl.value = response.data.data;
    console.log("上传头像组件获取的头像url:",response.data)
    // emit("headUrlUploaded",headUrl.value)
    const response1 = await instance.post("/updateDepartmentInfo", {
      headUrl: headUrl.value
    })

    if (response1.data.code == 0) {
      message.error(response1.data.data)
      return;
    }
    message.success("Update head url success!")
    return headUrl;
  }catch (e){
    message.error("upload error!")
  }
}

const headUrl = ref("");
// const emit = defineEmits(['headUrlUploaded']);
const props = defineProps({
  isSubmitClicked: Boolean,
  departmentHeadUrl:String,
  isClickDepartment: Boolean
});

// 监听 isSubmitClicked 变化
// watch(() =>props.isSubmitClicked, (newVal: any, oldVal: any) => {
//   if (newVal != oldVal ) {
//     // 调用 uploadFile 方法
//     console.log("before click props.isSubmitClicked:",props.isSubmitClicked)
//     uploadFile();
//     console.log("after click props.isSubmitClicked:",props.isSubmitClicked)
//   }
// });

// 监听 isSubmitClicked 变化
watch(() =>props.isClickDepartment, (newVal: any, oldVal: any) => {
  if (newVal != oldVal ) {
    // 调用 uploadFile 方法
    getHeadUrl()
  }
});

onMounted(() => {
  // 调用发送 GET 请求的方法，
  getHeadUrl()
});

const getHeadUrl = async() =>{
  try {
    const response = await instance.get("/getHeadLogoUrl")
    if(response.data.code==0){
      message.error("Get head url error!")
    }
    headUrl.value = response.data.data;
    message.success("Get head logo success!")
  }catch (e) {
    message.error("Catch error, Get head url error!")
  }
}

</script>

<style scoped>
.upload-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}

.upload-text {
  margin-top: 8px;
  color: #666;
  cursor: pointer;
}

.ant-upload-select-picture-card i {
  font-size: 32px;
  color: #999;
}
</style>
