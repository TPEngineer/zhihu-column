import { createStore } from "vuex";

export default createStore({
  state: {
    isLogin: false
  },
  mutations: {
    setLogin(state) {
      state.isLogin = true;
    }
  },
  actions: {},
  modules: {}
});
