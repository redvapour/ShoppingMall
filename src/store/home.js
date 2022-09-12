/* 
vuex管理的home模块
*/
import { reqBaseCategoryList, reqGetBannerList, reqFloorList } from "@/api";

const state = {
  categoryList: [], // 所有分类的数组
  bannerList: [], //轮播图的数据
  floorList: [], //floor组件的数据
};

const mutations = {
  //   接收保存分类列表
  GETCATEGORYLIST(state, categoryList) {
    state.categoryList = categoryList;
    state.categoryList.shift();
  },
  GETBANNERLIST(state, bannerList) {
    state.bannerList = bannerList;
  },
  GETFLOORLIST(state, floorList) {
    state.floorList = floorList;
  },
};

const actions = {
  async getCategoryList({ commit }) {
    let result = await reqBaseCategoryList();
    if (result.code == 200) {
      commit("GETCATEGORYLIST", result.data);
    }
    // console.log(result);
  },
  //获取首页轮播图的数据
  async getBannerList({ commit }) {
    let result = await reqGetBannerList();
    if (result.code == 200) {
      commit("GETBANNERLIST", result.data);
    }
    // console.log(result);
  },
  //获取floor数据
  async getFloorList({ commit }) {
    let result = await reqFloorList();
    if (result.code == 200) {
      //提交mutation
      commit("GETFLOORLIST", result.data);
    }
    // console.log(result);
  },
};

const getters = {};

export default {
  state,
  actions,
  mutations,
  getters,
};
