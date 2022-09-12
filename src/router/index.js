import Vue from "vue";
import VueRouter from "vue-router";
import routes from "./routes";
import store from "@/store";
// 声明使用插件
Vue.use(VueRouter);

// 编程式导航自己跳自己抛出 NavigationDuplicated 错误，重写一下push和replace方法，默认传入两个回调
let originPush = VueRouter.prototype.push;
let originReplace = VueRouter.prototype.replace;
//重写VueRouter.prototype身上的push方法了
VueRouter.prototype.push = function (location, resolve, reject) {
  if (resolve && reject) {
    originPush.call(this, location, resolve, reject);
  } else {
    originPush.call(
      this,
      location,
      () => {},
      () => {}
    );
  }
};
//重写VueRouter.prototype身上的replace方法了
VueRouter.prototype.replace = function (location, resolve, reject) {
  if (resolve && reject) {
    originReplace.call(this, location, resolve, reject);
  } else {
    originReplace.call(
      this,
      location,
      () => {},
      () => {}
    );
  }
};

// 向外默认暴露路由器对象
let router = new VueRouter({
  //   mode: "history", // 没有#的模式
  routes, // 注册所有路由
  // 路由跳转后，滚动条到最上方
  scrollBehavior(to, from, savedPosition) {
    return { y: 0 };
  },
});
//全局守卫：前置守卫（在路由跳转之间进行判断）
router.beforeEach(async (to, from, next) => {
  //获取仓库中的token-----可以确定用户是登录了
  let token = store.state.user.token;
  let name = store.state.user.userInfo.name;
  //用户登录了
  if (token) {
    //已经登录而且还想去登录------不行
    if (to.path == "/login" || to.path == "/register") {
      next("/");
    } else {
      //已经登陆了,访问的是非登录与注册,登录了且拥有用户信息放行
      if (name) {
        next();
      } else {
        //登陆了且没有用户信息,在路由跳转之前获取用户信息且放行
        try {
          await store.dispatch("getUserInfo");
          next();
        } catch (error) {
          //token失效从新登录
          await store.dispatch("userLogout");
          next("/login");
        }
      }
    }
  } else {
    //未登录：不能去交易相关、不能去支付相关【pay|paysuccess】、不能去个人中心
    //未登录去上面这些路由-----登录
    let toPath = to.path;
    if (
      toPath.indexOf("/trade") != -1 ||
      toPath.indexOf("/pay") != -1 ||
      toPath.indexOf("/center") != -1
    ) {
      //把未登录的时候向去而没有去成的信息，存储于地址栏中【路由】
      next("/login?redirect=" + toPath);
    } else {
      //去的不是上面这些路由（home|search|shopCart）---放行
      next();
    }
  }
});
export default router;
