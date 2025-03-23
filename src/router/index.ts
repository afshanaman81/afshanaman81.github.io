import { createRouter, createWebHistory } from "vue-router";
const Landing = () => import("@/views/LandingPage.vue");

const routes = [
  {
    path: "/",
    name: "LandingPage",
    component: Landing,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
