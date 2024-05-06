import axios from "axios";

// 创建axios实例
const instance = axios.create({
    baseURL: 'http://localhost:8081',
    withCredentials: false, // 跨域请求是否需要携带 cookie
});

// 添加请求拦截器
instance.interceptors.request.use(function (config) {
    const jwtToken = localStorage.getItem("jwtToken");
    // 在发送请求之前做些什么
    config.headers.Authorization = `${jwtToken}`;
    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});

export default instance;
