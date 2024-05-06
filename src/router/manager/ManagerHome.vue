<template>
  <div style="display: flex; flex-direction: column; height: 100vh;">
    <a-layout-header :style="headerStyle">
      <h2 style="color: white">
        实习徒弟企业认证后台
      </h2>
    </a-layout-header>
    <div style="flex: 1; display: flex;">
      <a-layout-sider :style="siderStyle">
        <a-button type="primary" @click="showPending">待审核企业</a-button>
        <a-button type="primary" @click="showApproved">已审核企业</a-button>
      </a-layout-sider>
      <a-layout-content :style="{ ...contentStyle, flex: 1 }">
        <div v-if="currentTab === 'pending'">
          <br>
          <form class="registration-form" @submit.prevent="searchPending" style="display: flex; align-items: center; gap: 16px;">
            <input placeholder="企业名称" type="text" v-model="searchName" style="flex-grow: 1; padding: 8px; border: 1px solid #ccc; border-radius: 4px; box-shadow: inset 0 1px 2px rgba(0,0,0,0.1); color: black;" />
            <input placeholder="社会信用代码" type="text" v-model="searchCode" style="flex-grow: 1; padding: 8px; border: 1px solid #ccc; border-radius: 4px; box-shadow: inset 0 1px 2px rgba(0,0,0,0.1); color: black;" />
            <button type="submit" style="color: #fff; background-color: #108ee9; border: none; border-radius: 4px; padding: 8px 16px; cursor: pointer;">搜索</button>
          </form>

          <br>
          <a-table :columns="pendingColumns" :dataSource="pendingData">
            <template v-slot:bodyCell="{ record, column }">
              <template v-if="column.key === 'review'">
                <approval-dialog :enterpriseId = "record.id" @approved="showPending"></approval-dialog>
                <reject-dialog :enterpriseId = "record.id" @reject="showPending"></reject-dialog>
              </template>
            </template>
          </a-table>


        </div>
        <div v-else>
          <br>
          <a-form class="registration-form" @submit.prevent="searchApproved" style="display: flex; align-items: center; gap: 16px;">
            <search-select @update:value="handleValueChange"></search-select>
            <button type="submit" style="color: #36e096">查询</button>
          </a-form>
          <br>

          <a-table :columns="approvedColumns" :data-Source="approvedData">
            <template v-slot:bodyCell="{ record, column }">
              <template v-if="column.key === 'enterprise_id'">
                <enterprise-detail-dialog :id="record.enterprise_id"></enterprise-detail-dialog>
              </template>
            </template>
          </a-table>

        </div>
      </a-layout-content>
    </div>
    <a-layout-footer :style="footerStyle">Footer</a-layout-footer>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import type { TableColumnsType } from 'ant-design-vue';
import { onMounted } from 'vue';

const currentTab = ref('pending');
const searchName = ref('');
const searchCode = ref('');
// 获取本地存储的jwtToken并将其添加到请求头中
const jwtToken = localStorage.getItem('jwtToken');

const currentStatus = ref('')
const handleValueChange = (value: any) => {
  console.log("审核状态改变为了：", value)
 currentStatus.value = value
}

const pendingColumns:TableColumnsType = [
  {
    title: 'ID',
    dataIndex: 'id',
    key: 'id',
  },
  {
    title: '企业名称',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: '公司地址',
    dataIndex: 'address',
    key: 'address',
  },
  {
    title: '企业简介',
    dataIndex: 'description',
    key: 'description',
  },
  {
    title: 'logo',
    dataIndex: 'logoUrl',
    key: 'logoUrl',
  },
  {
    title: '社会信用代码',
    dataIndex: 'creditCode',
    key: 'creditCode',
  },
  {
    title: '是否审核',
    dataIndex: 'status',
    key: 'status',
  },
  {
    title: '审核操作',
    dataIndex: 'review',
    key: 'review',
  },
  // 更多列...
];

const approvedColumns:TableColumnsType = [
  {
    title: 'ID',
    dataIndex: 'id',
    key: 'id',
  },
  {
    title: '管理员ID',
    dataIndex: 'manager_id',
    key: 'manager_id',
  },
  {
    title: '企业ID',
    dataIndex: 'enterprise_id',
    key: 'enterprise_id',
  },
  {
    title: '审核时间',
    dataIndex: 'approval_time',
    key: 'approval_time',
  },
  {
    title: '审核状态',
    dataIndex: 'status',
    key: 'status',
  },
];

const pendingData = ref([

]);

// 页面加载完毕发送请求
// 在页面加载完毕后发送请求
onMounted(() => {
  // 调用发送 GET 请求的方法，获取数据并更新 pendingData 或 approvedData
  fetchData();
});

import instance from "@/axios-instance";

const fetchData = async () => {
  try {
    if (currentTab.value === 'pending') {
      console.log("管理员主页面获取的jwt令牌：", jwtToken)
      const response = await instance.get("/selectPendingFirm");
      pendingData.value = response.data.data; // 更新待审核企业数据
      console.log(response.data)
    } else {
      currentTab.value = 'approval'
      // 发送 GET 请求，获取待审核或已审核企业数据
      const response = await instance.get('/selectApprovaledFirm');
      approvedData.value = response.data.data; // 更新已审核企业数据
      console.log(response.data)
    }
  } catch (error: any) {
    console.error('Error fetching data:', error);
    if (error.response && error.response.status === 401) {
      // 如果后端返回未登录状态码，处理未登录逻辑
      alert('您未登录，请先登录');
      // 这里可以跳转到登录页面或者执行其他处理
    } else {
      // 处理其他错误
      alert('发生错误，请稍后重试');
    }
  }
};

const approvedData = ref([  // 如果没有成功获取后端服务器数据，随机展示条数据

  // 可以继续添加更多已审核企业的数据对象...
]);

import EnterpriseDetailDialog from "@/components/manager/EnterpriseDetailDialog.vue";
import SearchSelect from "@/components/manager/SearchSelect.vue";
import ApprovalDialog from "@/components/manager/ApprovalDialog.vue";
import RejectDialog from "@/components/manager/RejectDialog.vue";

const showPending = async () => {
  try {
    currentTab.value = 'pending';
    // 添加显示待审核企业的逻辑
    console.log("管理员主页面获取的jwt令牌：", jwtToken)
    const response = await instance.get("/selectPendingFirm")
    console.log("showPending:",response.headers["Cache-Control"])
    console.log("返回的未审核的企业信息：", response.data)
    pendingData.value = response.data.data
  }catch (error: any){
    if (error.response && error.response.status === 401) {
      // 如果后端返回未登录状态码，处理未登录逻辑
      alert('您未登录，请先登录');
      // 这里可以跳转到登录页面或者执行其他处理
    } else {
      // 处理其他错误
      alert('发生错误，请稍后重试');
    }
  }

};

const showApproved = async () => {
  try {
    currentTab.value = 'approval'
    // 发送 GET 请求，获取待审核或已审核企业数据
    console.log("获取令牌", jwtToken)
    const response = await instance.get('/selectApprovaledFirm'); //
    console.log("返回的已经审核的企业信息：", response.data)
    approvedData.value = response.data.data; // 更新已审核企业数据
  }catch (error: any) {
    if (error.response && error.response.status === 401) {
      // 如果后端返回未登录状态码，处理未登录逻辑
      alert('您未登录，请先登录');
      // 这里可以跳转到登录页面或者执行其他处理
    } else {
      // 处理其他错误
      alert('发生错误，请稍后重试');
    }
  }
};

// 使用新的axios实例发送请求
const searchPending = async () => {
  try {
    // 获取搜索框中的企业名称和社会信用代码
    console.log("searchName:", searchName.value)
    console.log("searchCode:", searchCode.value)
    const response = await instance.post("/searchPendingFirm", {
      name: searchName.value,
      creditCode: searchCode.value
    })
    console.log("search pendingData:", response.data)
    pendingData.value = response.data.data
  } catch (e) {
    alert("error")
  }
};

const searchApproved = async () =>  {
  // 执行搜索并更新 `approvedData`
  // 添加搜索已审核企业的逻辑
  try {
    console.log("currentStatus",currentStatus.value)
    const response = await instance.post("/searchApprovalRecord",{
      status: currentStatus.value
    })
    console.log("search approvalData:", response.data)
    approvedData.value = response.data.data;
  }catch (e){
    alert("error")
  }
};


const headerStyle = {
  textAlign: 'center',
  color: '#fff',
  height: '64px',
  paddingInline: '50px',
  lineHeight: '64px',
  backgroundColor: '#0b76ef',
};

const siderStyle = {
  width: '200px',
  textAlign: 'center',
  lineHeight: '120px',
  color: '#fff',
  backgroundColor: '#3ba0e9',
};

const contentStyle = {
  textAlign: 'center',
  color: '#fff',
  backgroundColor: '#108ee9',
};

const footerStyle = {
  textAlign: 'center',
  color: '#fff',
  height: '30px',
  lineHeight: '30px',
  backgroundColor: '#7dbcea',
};
</script>

