import { createStore } from "vuex";
import Utils from "./config/utils";
import resumesService from "@/services/resumesServices";

Vue.use(Vuex);

const user = Utils.getStore("user");

const store = createStore({
  state: {
    loginUser: user,
    pendingResume: resumes
  },
  mutations: {
    setLoginUser(state, user) {
      state.loginUser = user;
      Utils.setStore("user", user);
    },
  },
  actions: {},
  getters: {
    getLoginUserInfo(state) {
      return state.loginUser;
    },
  },
});

export default store;