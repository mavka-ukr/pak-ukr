<script lang="ts" setup>
import { useRoute } from "vue-router";
import { onMounted } from "vue";
import { invokeLogin } from "@/application/invoke/api";
import { setSessionTokenToStorage } from "@/application/token";

const route = useRoute();

onMounted(() => {
  const code = route.query.code as string;
  invokeLogin({ mavkaCode: code }).then((authR) => {
    console.log(authR);
    setSessionTokenToStorage(authR.token);
    window.location.href = "/";
  });
});
</script>

<template>Входимо...</template>
