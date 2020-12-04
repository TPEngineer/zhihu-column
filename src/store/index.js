import { createStore } from "vuex";
import service from "@/utils/request";

export default createStore({
  state: {
    isLogin: false,
    userDetail: {
      avatar: ""
    }
  },
  mutations: {
    setLogin(state, userDetail) {
      state.isLogin = true;
      state.userDetail = userDetail;
    }
  },
  actions: {
    async fetchUserDetail({ commit }) {
      const res = await service.post("/user/detail");
      commit("setLogin", res);
    }
  },
  modules: {}
});
