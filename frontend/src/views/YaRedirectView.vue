<script lang="ts" setup>
import { useRoute } from "vue-router";
import { onMounted } from "vue";
import { invokeLogin } from "@/application/invoke/api";
import { setSessionTokenToStorage } from "@/application/token";
import { CONFIG } from "@/application/config";

const route = useRoute();

onMounted(() => {
  const code = route.query.code as string;
  invokeLogin({
    mavkaCode: code,
    redirectUri: `${CONFIG.PAK_APP_ULR}/ya`,
  }).then((authR) => {
    console.log(authR);
    setSessionTokenToStorage(authR.token);
    window.location.href = "/";
  });
});
</script>

<template>Входимо...</template>
