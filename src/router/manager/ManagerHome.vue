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
          <div style="display: flex; align-items: center; gap: 16px;">
            <a-input placeholder="企业名称" v-model="searchName" style="flex-grow: 1;" />
            <a-input placeholder="社会信用代码" v-model="searchCode" style="flex-grow: 1;" />
            <a-button type="primary" @click="searchPending">搜索</a-button>
          </div>
          <br>
          <a-table :columns="pendingColumns" :dataSource="pendingData">
            <template v-slot:bodyCell="{ record, column }">
              <template v-if="column.key === 'review'">
                <a-button type="success" @click="approve(record)" style="color: #22ff00; border: #e3124b">通过</a-button>
                <a-button type="danger" @click="reject(record)" style="color: red; border: #ec0858">未通过</a-button>
              </template>
            </template>
          </a-table>


        </div>
        <div v-else>
          <br>
          <div style="display: flex; align-items: center; gap: 16px;">
            <a-input placeholder="企业名称" v-model="searchName" style="flex-grow: 1;" />
            <a-input placeholder="社会信用代码" v-model="searchCode" style="flex-grow: 1;" />
            <a-button type="primary" @click="searchApproved">搜索</a-button>
          </div>
          <br>

          <a-table :columns="approvedColumns" :data-Source="approvedData">
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

const currentTab = ref('pending');
const searchName = ref('');
const searchCode = ref('');


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
    title: '社会信用代码',
    dataIndex: 'code',
    key: 'code',
  },
  {
    title: '公司地址',
    dataIndex: 'address',
    key: 'address',
  },
  {
    title: '企业简介',
    dataIndex: 'introduction',
    key: 'introduction',
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
    title: '企业名称',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: '社会信用代码',
    dataIndex: 'code',
    key: 'code',
  },
  {
    title: '公司地址',
    dataIndex: 'address',
    key: 'address',
  },
  {
    title: '企业简介',
    dataIndex: 'introduction',
    key: 'introduction',
  },
  {
    title: '审核状态',
    dataIndex: 'status',
    key: 'status',
  },
];

const pendingData = ref([
  // 待审核企业的数据对象
  {
    id: '001',
    name: '新加坡科技有限公司',
    code: 'SG12345678',
    address: '新加坡中区社区发展理事会',
    introduction: '这是一家专注于高新技术研发和应用的公司。',
  },
]);

const generateRecords = () => {
  const records = [];
  for (let i = 1; i <= 100; i++) {
    records.push({
      id: i.toString().padStart(3, '0'),
      name: `公司名称${i}`,
      code: `社会信用代码${i}`,
      address: `公司地址${i}`,
      introduction: `这是第${i}家公司的简介。`,
    });
  }
  pendingData.value = records;
};

generateRecords(); // 调用函数以生成记录


const approvedData = ref([
  {
    id: '001',
    name: '新加坡科技有限公司',
    code: 'SG12345678',
    address: '新加坡中区社区发展理事会',
    introduction: '这是一家专注于高新技术研发和应用的公司。',
    status: '通过', // 这个字段用于判断审核状态
  },
  // 可以继续添加更多已审核企业的数据对象...
]);

const showPending = () => {
  currentTab.value = 'pending';
  // 添加显示待审核企业的逻辑
};

const showApproved = () => {
  currentTab.value = 'approved';
  // 添加显示已审核企业的逻辑
};

const searchPending = () => {
  // 执行搜索并更新 `pendingData`
  // 添加搜索待审核企业的逻辑
  alert("您点击了待审核企业的搜索框！")
};

const searchApproved = () => {
  // 执行搜索并更新 `approvedData`
  // 添加搜索已审核企业的逻辑
  alert("您点击了已经审核企业的搜索框！")
};

// 审核通过的函数
const approve = (record) => {
  // 直接访问record的属性来更新审核状态
  record.review = 'approved';
  alert(record.name + "已经审核通过！");
};

// 审核未通过的函数
const reject = (record) => {
  // 直接访问record的属性来更新审核状态
  record.review = 'rejected';
  alert(record.name + "审核未通过。");
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

