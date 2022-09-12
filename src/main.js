import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

//统一接口api文件夹里面全部请求函数
//统一引入
import * as API from "@/api";

//定义全局组件
import typeNav from "@/components/TypeNav";
import Carsousel from "@/components/Carousel";
import Pagination from "@/components/Pagination";
import { Button, MessageBox } from "element-ui"; //按需引入element-ui
Vue.component(typeNav.name, typeNav);
Vue.component(Carsousel.name, Carsousel);
Vue.component(Pagination.name, Pagination);
Vue.component(Button.name, Button);

// element-ui的一些方法
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;

//引入MockServer.js----mock数据
import "@/mock/mockServe";
//引入swiper样式
import "swiper/css/swiper.css";

// 注册使用懒加载插件
import VueLazyload from "vue-lazyload";
import lazyimg from "@/assets/lazyimg.gif";
Vue.use(VueLazyload, {
  loading: lazyimg, //懒加载默认的图片
});

//引入表单校验插件
import "@/plugins/validate";

Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
  beforeCreate() {
    //全局事件总线$bus配置
    Vue.prototype.$bus = this;
    Vue.prototype.$API = API;
  },
  router, // 注册路由器
  store, // 注册vuex的store对象
}).$mount("#app");
