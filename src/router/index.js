import { createRouter, createWebHistory } from "vue-router";
import AppLogin from "../views/AppLogin.vue";
import AppChoose from "../views/AppChoose.vue";
import AppAdmin from "../views/AppAdmin.vue";
import AppAssignments from "../views/AppAssignments.vue";
import AppPin from "../views/AppPin.vue";
import AppHistory from "../views/AppHistory.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      redirect: "/login",
    },
    {
      path: "/login",
      component: AppLogin,
    },
    {
      path: "/choose",
      component: AppChoose,
    },
    {
      path: "/admin",
      component: AppAdmin,
    },
    {
      path: "/assignments",
      component: AppAssignments,
    },
    {
      path: "/pin",
      component: AppPin,
    },
    {
      path: "/history",
      component: AppHistory,
    },
  ],
});

export default router;
