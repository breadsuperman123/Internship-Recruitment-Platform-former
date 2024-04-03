<template>
  <a-select
      v-model:value="value"
      show-search
      placeholder="Select a person"
      style="width: 200px"
      :options="options"
      :filter-option="filterOption"
      @focus="handleFocus"
      @blur="handleBlur"
      @change="handleChange"
  ></a-select>
</template>

<script lang="ts" setup>
import type { SelectProps } from 'ant-design-vue';
import { ref, defineEmits } from 'vue';

const options = ref<SelectProps['options']>([
  { value: '通过', label: '通过' },
  { value: '未通过', label: '未通过' },
]);

const handleChange = (value: string) => {
  console.log(`selected ${value}`);
  emit('update:value', value); // 触发自定义事件
};

const handleBlur = () => {
  console.log('blur');
};

const handleFocus = () => {
  console.log('focus');
};

const filterOption = (input: string, option: any) => {
  return option.value.toLowerCase().indexOf(input.toLowerCase()) >= 0;
};

const value = ref<string | undefined>(undefined);

// 定义emit
const emit = defineEmits(['update:value']);
</script>
