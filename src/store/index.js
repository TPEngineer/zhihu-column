import { createStore } from "vuex";
import service from "@/utils/request";

export default createStore({
  state: {
    isLogin: false,
    userDetail: {
      avatar: ""
    },
    columnAll: []
  },
  mutations: {
    setLogin(state, userDetail) {
      state.isLogin = true;
      state.userDetail = userDetail;
    },
    setColumnAll(state, columnAll) {
      state.columnAll = columnAll;
    }
  },
  actions: {
    async fetchUserDetail({ commit }) {
      const res = await service.post("/user/detail");
      commit("setLogin", res);
    },
    async fetchColumnAll({ commit }) {
      const res = await service.post("/column/all");
      commit("setColumnAll", res);
    }
  },
  modules: {}
});
