import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import PakView from "@/views/PakView.vue";
import YaRedirectView from "@/views/YaRedirectView.vue";
import UserView from "@/views/UserView.vue";
import CreateView from "@/views/CreateView.vue";
import CreateVersionView from "@/views/CreateVersionView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
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
    {
      path: encodeURI("/:name/створити-версію"),
      name: "create-version",
      component: CreateVersionView,
    },
    {
      path: encodeURI("/:name/:version"),
      name: "pak-version",
      component: PakView,
    },
    {
      path: encodeURI("/:name"),
      name: "pak",
      component: PakView,
    },
    {
      path: encodeURI("/автор/:username"),
      name: "user",
      component: UserView,
    },
  ],
  scrollBehavior() {
    return { top: 0, left: 0 };
  },
});

export default router;
