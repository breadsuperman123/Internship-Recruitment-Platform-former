import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/reset.css'; // 确保使用正确的Ant Design样式文件
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import Header from '@headlessui/vue'

import axios from 'axios';
import {createPinia} from "pinia";

import * as ElementPlusIconsVue from '@element-plus/icons-vue'
const pinia = createPinia()

export default pinia

const app = createApp(App);
for(const [key, component] of Object.entries(ElementPlusIconsVue)){
    app.component(key, component)
}
app.use(router);
app.use(Antd);
app.mount('#app');
app.use(ElementPlus);
app.use(Header)
app.use(pinia)
app.config.globalProperties.$axios = axios;
