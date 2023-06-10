import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import GoogleLogin from "../views/GoogleLogin.vue";
import MyPage from "../views/MyPage.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/about",
    name: "about",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
  },
  {
    path: "/login",
    name: "login",
    component: GoogleLogin,
  },
  {
    path: "/MyPage",
    name: "MyPage",
    component: MyPage,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
