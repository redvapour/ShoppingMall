import axios from "axios";

let mockRequests = axios.create({
  //基础路径
  baseURL: "/mock",
  //请求不能超过5S
  timeout: 5000,
});

//请求拦截器----在项目中发请求（请求没有发出去）可以做一些事情
mockRequests.interceptors.request.use((config) => {
  return config;
});

//响应拦截器----当服务器手动请求之后，做出响应（相应成功）会执行的
mockRequests.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    return Promise.reject(error);
  }
);
export default mockRequests;
