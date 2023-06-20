import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import PushPrView from "../views/PushPrView.vue";
import CalendarView from "../views/VcalendarView.vue";
import GoogleLogin from "../views/GoogleLogin.vue";
import MyPage from "../views/MyPage.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/postselfpr",
    name: "PushPrView",
    component: PushPrView,
  },
  {
    path: "/calendar",
    name: "calender",
    component: CalendarView,
  },
  {
    path: "/login",
    name: "login",
    component: GoogleLogin,
  },
  {
    path: "/mypage",
    name: "MyPage",
    component: MyPage,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
