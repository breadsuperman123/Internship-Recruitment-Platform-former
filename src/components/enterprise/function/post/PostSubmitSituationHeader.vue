<template>
  <div class="post-details-container">
    <a-page-header
        :title="formData.enterpriseName"
        class="site-page-header"
        :sub-title="formData.department"
        :avatar="{ src: formData.departmentHeadUrl }"
    >
      <template #extra>
        <a-button key="1" type="primary">Apply Now</a-button>
      </template>
      <div class="post-details-content">
        <div class="info">
          <p class="info-title">Position Details</p>
          <div class="info-item">
            <strong>Position Name:</strong> {{ formData.name }}
          </div>
          <div class="info-item">
            <strong>Position Type:</strong> {{ formData.postSmallType }}
          </div>
          <div class="info-item">
            <strong>Salary:</strong> {{ formData.pay }}￥/day
          </div>
          <div class="info-item">
            <strong>Minimum Internship:</strong> {{ formData.minInternship }} months
          </div>
          <div class="info-item">
            <strong>Location:</strong> {{ formData.workPlace }}
          </div>
          <div class="info-item">
            <strong>Application Deadline:</strong> {{ formData.deliveryDeadline }}
          </div>
          <div class="info-item">
            <strong>City:</strong> {{ formData.workCity }}
          </div>
          <div class="info-item">
            <strong>Status:</strong> {{ formData.status }}
          </div>
          <div class="info-item">
            <strong>Description:</strong> {{ formData.description }}
          </div>
          <div class="info-item">
            <strong>Requirements:</strong> {{ formData.demand }}
          </div>
        </div>
        <div class="image">
          <img :src="formData.enterpriseHeadLogoUrl" alt="Enterprise Logo" />
        </div>
      </div>
    </a-page-header>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import instance from "@/axios-instance";
import { message } from "ant-design-vue";
import { useRoute } from 'vue-router';

const formData = ref({
  id:"",
  name:"",
  postSmallType:"",
  pay:"",
  minInternship:"",
  workPlace:"",
  deliveryDeadline:"",
  workCity:"",
  status:"",
  description:"",
  demand:"",
  enterpriseName:"",
  department:"",
  departmentHeadUrl:"",
  enterpriseHeadLogoUrl:""
});

const route = useRoute();

onMounted(async () => {
  try {
    const postId = route.params.postId;
    const response = await instance.post("/getPostDetailInformation", {
      id: postId
    });
    if(response.data.code == 0){
      message.error("Failed to fetch post details!");
      return;
    }
    formData.value = response.data.data[0];
    message.success("Post details fetched successfully!");
  } catch (e) {
    message.error("Error fetching post details!");
  }
});
</script>

<style scoped>
.post-details-container {
  padding: 20px;
}

.post-details-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.info {
  flex: 1;
}

.info-title {
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 10px;
}

.info-item {
  margin-bottom: 5px;
}

.image img {
  width: 100%;
  max-width: 200px;
  height: auto;
}
</style>
