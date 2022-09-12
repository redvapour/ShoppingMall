import Home from "@/pages/Home";
import Search from "@/pages/Search";
import Detail from "@/pages/Detail";
import Register from "@/pages/Register";
import Login from "@/pages/Login";
import AddCartSuccess from "@/pages/AddCartSuccess";
import ShopCart from "@/pages/ShopCart";
import Trade from "@/pages/Trade";
import Pay from "@/pages/Pay";
import PaySuccess from "@/pages/PaySuccess";
import Center from "@/pages/Center";
import MyOrder from "@/pages/Center/myOrder";

import store from "@/store";

/* 
所有静态路由配置的数组
*/
export default [
  {
    path: "/",
    component: Home,
  },
  {
    name: "search", // 是当前路由的标识名称
    path: "/search/:keyword?",
    component: Search,
  },
  {
    name: "detail",
    path: "/detail/:skuId?",
    component: Detail,
    props: true,
  },

  {
    path: "/register",
    component: Register,
    meta: { isHideFooter: true }, // 需要隐藏footer的路由添加此配置
  },
  {
    path: "/login",
    component: Login,
    meta: { isHideFooter: true },
    beforeEnter: (to, from, next) => {
      // 如果还没有登陆, 放行
      if (!store.state.user.userInfo.token) {
        next();
      } else {
        // 如果已经登陆, 跳转到首页
        next("/");
      }
    },
  },
  {
    name: "addcartsuccess",
    path: "/addcartsuccess",
    component: AddCartSuccess,
  },
  {
    path: "/shopcart",
    component: ShopCart,
  },
  {
    path: "/trade",
    component: Trade,
    /* 只能从购物车界面, 才能跳转到交易界面 */
    beforeEnter(to, from, next) {
      if (from.path === "/shopcart") {
        next();
      } else {
        next("/shopcart");
      }
    },
  },
  {
    path: "/pay",
    component: Pay,
    // 将query参数映射成props传递给路由组件
    props: (route) => ({ orderId: route.query.orderId }),
    /* 只能从交易界面, 才能跳转到支付界面 */
    beforeEnter(to, from, next) {
      if (from.path === "/trade") {
        next();
      } else {
        next("/trade");
      }
    },
  },
  {
    path: "/paysuccess",
    component: PaySuccess,
    /* 只有从支付界面, 才能跳转到支付成功的界面 */
    beforeEnter(to, from, next) {
      if (from.path === "/pay") {
        next();
      } else {
        next("/pay");
      }
    },
  },
  {
    path: "/center",
    component: Center,
    children: [
      {
        // path: '/center/myorder',
        path: "myorder",
        component: MyOrder,
      },

      {
        path: "",
        redirect: "myorder",
      },
    ],
  },
];
