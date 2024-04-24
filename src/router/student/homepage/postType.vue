<template>
  <a-menu
      v-model:openKeys="openKeys"
      v-model:selectedKeys="selectedKeys"
      style="width: 400px"
      mode="vertical"
      :items="items"
      @click="handleClick"
  />
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';

const selectedKeys = ref([]);
const openKeys = ref([]);
const items = ref([]);

const router = useRouter();

const fetchData = async () => {
  try {
    const bigPostTypesResponse = await axios.get('http://localhost:8081/bigPostTypes');
    const bigPostTypes = bigPostTypesResponse.data;

    const smallPostTypesResponse = await axios.get('http://localhost:8081/smallPostTypes');
    const smallPostTypes = smallPostTypesResponse.data;

    items.value = buildMenuItems(bigPostTypes, smallPostTypes);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

const buildMenuItems = (bigPostTypes, smallPostTypes) => {
  const menuItems = [];

  bigPostTypes.forEach(bigType => {
    const menuItem = {
      key: bigType.name, // 使用大类名称作为键
      label: bigType.name, // 使用大类名称作为标签
      title: bigType.name, // 使用大类名称作为标题
    };

    // 找到与此大类对应的小类
    const correspondingSmallTypes = smallPostTypes.filter(smallType => smallType.bigName === bigType.name);

    // 将小类添加到子菜单项中
    menuItem.children = correspondingSmallTypes.map(smallType => ({
      key: smallType.smallName,
      label: smallType.smallName,
      title: smallType.smallName,
      onClick: () => navigateToPage(bigType.name, smallType.smallName) // 添加点击事件处理程序
    }));

    menuItems.push(menuItem);
  });

  return menuItems;
};

const handleClick = menuInfo => {
  console.log('click ', menuInfo);
};

const navigateToPage = (bigTypeName, smallTypeName = null) => {
  // 打印大类和小类参数
  console.log('Navigating to page with big type:', bigTypeName);
  if (smallTypeName) {
    console.log('And small type:', smallTypeName);
  }

  // 构建路由参数
  const params = smallTypeName ? { bigType: bigTypeName, smallType: smallTypeName } : { bigType: bigTypeName };
  console.log("路由参数",params)
  // 使用路由参数进行页面跳转
  router.push({ name: 'studentSearchPage', params: params });
};

// 组件挂载时获取数据
onMounted(() => {
  fetchData();
});
</script>
