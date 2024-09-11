import "./assets/styles/main.scss";

import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import pakInvokeClient from "@/application/invoke/client";
import { invokeGetMe } from "@/application/invoke/api";
import { Pak } from "@/application";
import PakUser from "@/application/models/PakUser";
import FloatingVue from "floating-vue";

function startApp() {
  const app = createApp(App);
  app.use(FloatingVue, {
    instantMove: true,
  });
  app.use(router);
  app.mount("#app");
}

pakInvokeClient.start().then((authorized) => {
  if (authorized) {
    invokeGetMe()
      .then((me) => {
        Pak.me = {
          account: me.account,
          user: PakUser.fromT(me.user),
        };
        startApp();
      })
      .catch(() => {
        alert("Помилка! Перезавантажте сторінку щоб спробувати знову.");
      });
  } else {
    startApp();
  }
});
