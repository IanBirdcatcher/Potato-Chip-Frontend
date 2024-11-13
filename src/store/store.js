import { createStore } from "vuex";
import Utils from "./config/utils";

const user = Utils.getStore("user");
const projects = Utils.getStore("projects") || [];

const store = createStore({
  state: {
    loginUser: user,
    projects: projects, 
  },
  mutations: {
    setLoginUser(state, user) {
      state.loginUser = user;
      Utils.setStore("user", user);
    },
    setProjects(state, projects) {
      state.projects = projects;
      Utils.setStore("projects", projects);  
    },
    addProject(state, project) {
      state.projects.push(project);
      Utils.setStore("projects", state.projects);  
    },
  },
  actions: {
    fetchProjects({ commit }, projects) {
      commit("setProjects", projects);
    },
  },
  getters: {
    getLoginUserInfo(state) {
      return state.loginUser;
    },
    getProjects(state) {
      return state.projects;
    },
  },
});

export default store;
