<template>
  <div>
    <a-switch
        :checked="theme === 'dark'"
        checked-children="Dark"
        un-checked-children="Light"
        @change="changeTheme"
    />
    <br />
    <br />
    <a-menu
        v-model:openKeys="openKeys"
        v-model:selectedKeys="selectedKeys"
        style="width: 256px"
        mode="inline"
        :theme="theme"
        :items="items"
        @selct="handleMenuSelect"
        @click="handleMenuSelect"
    />
  </div>
</template>
<script lang="ts" setup>
import { h, ref, defineEmits } from 'vue';
import {
  MailOutlined,
  CalendarOutlined,
  AppstoreOutlined,
  SettingOutlined,
} from '@ant-design/icons-vue';
import type { MenuTheme } from 'ant-design-vue';

const theme = ref<MenuTheme>('dark');
const selectedKeys = ref(['1']);
const openKeys = ref(['sub1']);


const items = ref([
  {
    key: '1',
    icon: () => h(AppstoreOutlined),
    label: '岗位管理',
    title: 'postManagement',
  },
  {
    key: '2',
    icon: () => h(CalendarOutlined),
    label: '简历审批',
    title: 'resumeApproval',
    children: [
      {
        key:'2.1',
        label:'审批记录',
        title:'approvalRecord'
      },
      {
        key:'2.2',
        label:'投递记录',
        title:'submitRecord'
      },

    ]
  },
  {
    key: '3',
    icon: () => h(MailOutlined),
    label: '人才探索',
    title: 'talentExploration',
  },
  {
    key: '4',
    icon: () => h(SettingOutlined),
    label: 'settings',
    title: 'settings',
    children: [
      {
        key: '4.1',
        label: '部门信息',
        title: 'department',
      },
    ],
  },
]);
const emit = defineEmits(['menuSelected']);
const changeTheme = (checked: boolean) => {
  theme.value = checked ? 'dark' : 'light';
};


// Define handleMenuSelect method to handle menu item selection
// Define handleMenuSelect method to handle menu item selection
const handleMenuSelect = (selectedItem: any) => {
  // Emit an event to notify the parent component about the selected menu item
  emit('menuSelected', selectedItem);
  console.log("selectedKeys", selectedKeys)
  // Log the key of the selected menu item to the console
  console.log('Selected menu item key:', selectedItem.key);
};


</script>

