<template>
  <div class="components-page-header-demo-content">
    <a-page-header style="margin-left: 70px"
        :title="enterpriseInfo.value.name"
        class="site-page-header"
        :sub-title="enterpriseInfo.value.address"
    >
      <a-row class="content">
        <div style="flex: 1">
          <p>
            {{enterpriseInfo.value.description}}
          </p>
        </div>
        <div class="image">
          <img
              :src="enterpriseInfo.value.logoUrl"
              alt="content"
              style="width: 120px;height: 110px;margin-right: 70px"
          />
        </div>
      </a-row>
    </a-page-header>
  </div>
</template>
<script lang="ts" setup>
import {ref, onMounted, watch, reactive} from 'vue';
import { defineProps } from 'vue';


const props = defineProps({
  enterpriseInfo: {
    type: String,
    required: true,
  }
});


const enterprise=JSON.parse(props.enterpriseInfo)
console.log("解析后的公司信息",enterprise)

const enterpriseInfo = reactive({
  name: '',
  description: '',
  logoUrl: '',
  address: ''
});

// 更新 enterpriseInfo 变量
enterpriseInfo.value = {
  name: enterprise[0].name,
  description: enterprise[0].description,
  logoUrl: enterprise[0].logoUrl,
  address: enterprise[0].address,
};


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
