import { createRouter, createWebHistory } from "vue-router";

import Login from "./views/Login.vue";
import CreateResume from "./views/CreateResume.vue"

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      alias: "/login",
      name: "login",
      component: Login,
    },
    {
      path: "/Create",
      alias: "/CreateResume",
      name: "CreateResume",
      component: CreateResume,
    },
  ],
});
export default router;
