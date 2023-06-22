import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import PushPrView from "../views/PushPrView.vue";
import GoogleLogin from "../views/GoogleLogin.vue";
import MyPage from "../views/MyPage.vue";
import TodoList from "../views/todoListApp.vue";

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
    path: "/login",
    name: "login",
    component: GoogleLogin,
  },
  {
    path: "/mypage",
    name: "MyPage",
    component: MyPage,
  },
  {
    path: "/todolist",
    name: "todolist",
    component: TodoList,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
