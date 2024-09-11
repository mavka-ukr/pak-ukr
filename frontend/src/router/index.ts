import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import PakView from "@/views/PakView.vue";
import YaRedirectView from "@/views/YaRedirectView.vue";
import UserView from "@/views/UserView.vue";
import CreateView from "@/views/CreateView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: encodeURI("/п/:name"),
      name: "pak",
      component: PakView,
    },
    {
      path: encodeURI("/к/:username"),
      name: "user",
      component: UserView,
    },
    {
      path: encodeURI("/створити"),
      name: "create",
      component: CreateView,
    },
    {
      path: encodeURI("/ya"),
      name: "ya",
      component: YaRedirectView,
    },
  ],
  scrollBehavior() {
    return { top: 0, left: 0 };
  },
});

export default router;
