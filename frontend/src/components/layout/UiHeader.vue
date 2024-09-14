<script setup lang="ts">
import { Pak } from "@/application/index.js";
import UiMenu from "@/components/layout/UiMenu.vue";
import UiMenuItem from "@/components/layout/UiMenuItem.vue";
import { RouterLink } from "vue-router";
import { computed } from "vue";
import { CONFIG } from "@/application/config";

const loginUrl = computed(() => {
  return `https://я.мавка.укр/oauth/authorize?client_id=1&redirect_uri=${CONFIG.PAK_APP_ULR}/ya&response_type=code&scope=id father_name name family_name family_mother_name photo email`;
});

function logout() {
  localStorage.clear();
  window.location.reload();
}
</script>

<template>
  <div class="UiHeader">
    <RouterLink to="/" class="UiHeaderLogo">
      <img src="../../assets/images/logo.png" alt="" />
      Пак
    </RouterLink>
    <div class="UiHeaderRight">
      <template v-if="Pak.me">
        <RouterLink :to="encodeURI(`/створити`)" class="UiHeaderButton">
          +
        </RouterLink>
        <VDropdown :transition="false" :distance="6">
          <button
            :to="encodeURI(`/к/${Pak.me.user.data.id}`)"
            class="UiHeaderButton"
          >
            {{ Pak.me.user.data.name }}
          </button>
          <template #popper>
            <UiMenu>
              <UiMenuItem :component="RouterLink" :to="encodeURI('/к/мтп')">
                Профіль
              </UiMenuItem>
              <UiMenuItem
                :component="RouterLink"
                :to="encodeURI('/налаштування')"
              >
                Налаштування
              </UiMenuItem>
              <UiMenuItem component="button" @click="logout" style="color: red">
                Вийти
              </UiMenuItem>
            </UiMenu>
          </template>
        </VDropdown>
      </template>
      <template v-else>
        <a :href="loginUrl" class="UiHeaderButton">Увійти</a>
      </template>
    </div>
  </div>
</template>

<style lang="scss">
.UiHeader {
  position: sticky;
  top: 0;
  z-index: 100;
  width: 100%;
  height: 40px;
  display: flex;
  align-items: center;
  padding: 0 3rem;
  margin: 0 auto;
  background-color: white;
  border-bottom: 1px solid rgb(var(--ui-border-rgb));

  @media (max-width: 1024px) {
    padding: 0 1rem;
  }

  .UiHeaderLogo {
    display: flex;
    align-items: center;
    font-size: 1.25rem;
    font-weight: bold;
    font-family: Jost, sans-serif;
    color: black;
    text-decoration: none;

    img {
      margin-right: 0.5rem;
      height: 1.25rem;
      width: 1.25rem;
    }
  }

  .UiHeaderRight {
    margin-left: auto;

    display: flex;
    align-items: center;
  }

  .UiHeaderButton {
    padding: 0.5rem 1rem;
    height: 39px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: none;
    border-left: 1px solid rgb(var(--ui-border-rgb));
    font-size: 0.8rem;
    font-weight: bold;
    text-transform: uppercase;
    color: #333;
    text-decoration: none;
    background: white;
    cursor: pointer;

    &:last-child {
      border-right: 1px solid rgb(var(--ui-border-rgb));
    }

    &:hover {
      background: rgb(var(--ui-border-rgb));
    }
  }
}
</style>
