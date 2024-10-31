import { createRouter, createWebHistory } from "vue-router";
import LoginView from "../views/LoginView.vue";
import TasksView from "../views/TasksView.vue";
import RegisterView from "@/views/RegisterView.vue";

const routes = [
  { path: "/", name: "Login", component: LoginView },
  { path: "/tasks", name: "Tasks", component: TasksView },
  { path: "/register", name: "Register", component: RegisterView },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem("token");
  if (to.name !== "Login" && !token) {
    next({ name: "Login" });
  } else {
    next();
  }
});

export default router;
