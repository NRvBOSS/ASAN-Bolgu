import { createRouter, createWebHistory } from "vue-router";
import AppLogin from "../views/AppLogin.vue";
import AppChoose from "../views/AppChoose.vue";
import AppAdmin from "../views/AppAdmin.vue";
import AppPin from "../views/AppPin.vue";
import AppHistory from "../views/AppHistory.vue";
import AppActivityList from "@/components/AppActivityList.vue";

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
      component: AppActivityList,
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

// router.beforeEach((to, from, next) => {
//   const token = localStorage.getItem("token");

//   // login tələb edən route-lar
//   if (to.meta.requiresAuth && !token) {
//     return next("/login");
//   }

//   // əgər token varsa və /login-ə getmək istəyirsə → dashboard-a qaytar
//   if (to.path === "/login" && token) {
//     return next("/");
//   }

//   next();
// });

export default router;
