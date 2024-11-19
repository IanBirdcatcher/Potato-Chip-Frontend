import { createStore } from "vuex";
import Utils from "../config/utils.js";
import { reactive } from "vue";

const user = Utils.getStore("user");

const store = createStore({
  state: {
    loginUser: user,
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

export const userState = reactive({
  isAdmin: false,
  user: null,
  reset() {
    this.user = null;
    this.isAdmin = false;
  },
});

export default store;