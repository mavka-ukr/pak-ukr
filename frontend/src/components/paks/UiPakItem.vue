<script setup lang="ts">
import type PakPak from "@/application/models/PakPak";

defineProps<{
  pak: PakPak;
}>();
</script>

<template>
  <div class="UiPakItem">
    <div class="UiPakItemHead">
      <template v-if="pak.data.logoUrl">
        <img :src="pak.data.logoUrl" alt="" />
      </template>
      <RouterLink :to="encodeURI(`/${pak.data.name}`)" class="UiPakItemTitle">
        {{ pak.data.name }}
      </RouterLink>
      <template v-if="pak.data.version">
        <div class="UiPakItemVersion">{{ pak.data.version.data.name }}</div>
      </template>
    </div>
    <template v-if="pak.data.description">
      <div class="UiPakItemDescription">{{ pak.data.description }}</div>
    </template>
    <div class="UiPakItemFooter">
      <template v-if="pak.data.docsUrl">
        <a :href="pak.data.docsUrl" class="UiPakItemFooterItem">
          Документація
        </a>
      </template>
      <template v-if="pak.data.sourceUrl">
        <a :href="pak.data.sourceUrl" class="UiPakItemFooterItem">Джерело</a>
      </template>
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

  padding: 1rem;

  @media (max-width: 1024px) {
    border-left: 0;
    border-right: 0;

    & + & {
      border-top: 0;
    }
  }

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
