<template>
  <a-list item-layout="horizontal" :data-source="data">
    <template #renderItem="{ item }">
      <a-list-item>
        <a-list-item-meta
        >
          <template #title>
            <router-link :to="item.path">{{ item.title }}</router-link>
          </template>
          <template #avatar>
            <a-avatar src="https://joeschmoe.io/api/v1/random" />
          </template>
        </a-list-item-meta>
      </a-list-item>
    </template>
  </a-list>
</template>
<script lang="ts" setup>
import { defineProps } from 'vue';
import { useRouter } from 'vue-router';

interface DataItem {
  title: string;
  path: string;
}

const router = useRouter();

const data: DataItem[] = [
  {
    title: '我的简历',
    path: '/studentResume',
  },
  {
    title: '我的投递',
    path: '/studentPost',
  },
];

</script>
