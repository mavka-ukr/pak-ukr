<script setup lang="ts">
import type PakPak from "@/application/models/PakPak";

defineProps<{
  pak: PakPak;
}>();
</script>

<template>
  <div class="UiPakItem">
    <div class="UiPakItemHead">
      <img
        src="https://avatars.githubusercontent.com/u/129215866?s=200&v=4"
        alt=""
      />
      <RouterLink :to="encodeURI('/п/привіт')" class="UiPakItemTitle">
        привіт
      </RouterLink>
      <div class="UiPakItemVersion">1.0.0</div>
    </div>
    <div class="UiPakItemDescription">Привіт від Лесі!</div>
    <div class="UiPakItemFooter">
      <a href="https://github.com/kohutd" class="UiPakItemFooterItem">
        документація
      </a>
      <a href="https://github.com/kohutd" class="UiPakItemFooterItem">код</a>
    </div>
  </div>
</template>

<style lang="scss">
.UiPakItem {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  border: 1px solid rgb(var(--ui-border-rgb));
  background: white;

  @media (max-width: 1024px) {
    border-left: 0;
    border-right: 0;

    & + & {
      border-top: 0;
    }
  }

  padding: 1rem;

  .UiPakItemHead {
    display: flex;
    align-items: center;

    img {
      height: 1.25rem;
      width: 1.25rem;
      border-radius: 2px;
      margin-right: 0.5rem;
    }
  }

  .UiPakItemTitle {
    font-size: 1.5rem;
    font-weight: bold;
    color: black;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }

  .UiPakItemVersion {
    margin-left: 0.5rem;
    font-size: 1rem;
    color: #666;
  }

  .UiPakItemDescription {
    margin-top: 0.5rem;
  }

  .UiPakItemFooter {
    margin-top: 1rem;
    display: flex;
    align-items: center;

    .UiPakItemFooterItem {
      margin-right: 0.5rem;
      font-size: 0.8rem;

      &:last-child {
        margin-right: 0;
      }
    }

    a {
      color: #333;

      &:hover {
        color: black;
      }
    }
  }
}
</style>
