import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import PushPrView from "../views/PushPrView.vue";
import MyPage from "../views/MyPage.vue";
import TodoList from "../views/TodoList.vue";
import LoginView from "../views/LoginView";

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
    path: "/mypage",
    name: "MyPage",
    component: MyPage,
  },
  {
    path: "/todolist",
    name: "todolist",
    component: TodoList,
  },
  {
    path: "/login",
    name: "login",
    component: LoginView,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
