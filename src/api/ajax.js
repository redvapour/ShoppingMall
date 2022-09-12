import axios from "axios";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import store from "@/store";
// 配置不显示右上角的旋转进度条, 只显示水平进度条
NProgress.configure({ showSpinner: false });

const service = axios.create({
  baseURL: "/api", // 基础路径
  timeout: 15000, // 连接请求超时时间
});

//请求拦截器
service.interceptors.request.use((config) => {
  if (store.state.detail.uuid_token) {
    //请求头添加一个字段(userTempId):和后台老师商量好了
    config.headers.userTempId = store.state.detail.uuid_token;
  }
  //需要携带token带给服务器
  if (store.state.user.token) {
    config.headers.token = store.state.user.token;
  }
  // 显示请求中的水平进度条
  NProgress.start();
  return config;
});

//响应拦截器
service.interceptors.response.use(
  (response) => {
    // 隐藏进度条
    NProgress.done();
    // 返回响应体数据
    return response.data;
  },
  (error) => {
    // 隐藏进度条
    NProgress.done();
    // 统一处理一下错误
    alert(`请求出错: ${error.message || "未知错误"}`);
    // 可以选择不处理或处理
    return Promise.reject(error);
  }
);

export default service;
