import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/reset.css'; // 确保使用正确的Ant Design样式文件
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import Header from '@headlessui/vue'

import axios from 'axios';



const app = createApp(App);
app.use(router);
app.use(Antd);
app.mount('#app');
app.use(ElementPlus);
app.use(Header)
app.config.globalProperties.$axios = axios;
