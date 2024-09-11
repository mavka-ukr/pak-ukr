<script setup lang="ts">
import { useRouter } from "vue-router";

const router = useRouter();

function back() {
  router.back();
}
</script>

<template>
  <div class="UiSubheader">
    <div class="UiSubheaderInner">
      <button @click="back" class="UiSubheaderInnerBack">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="feather feather-arrow-left"
        >
          <line x1="19" y1="12" x2="5" y2="12"></line>
          <polyline points="12 19 5 12 12 5"></polyline>
        </svg>
      </button>
      <slot />
      <template v-if="$slots.right">
        <div class="UiSubheaderInnerRight">
          <slot name="right" />
        </div>
      </template>
    </div>
  </div>
</template>

<style lang="scss">
.UiSubheader {
  position: sticky;
  top: -1px;
  z-index: 100;
  height: 73px;
  background-color: white;
  margin-top: -1px;
  border-top: 1px solid rgb(var(--ui-border-rgb));
  border-bottom: 1px solid rgb(var(--ui-border-rgb));
  font-size: 1.25rem;
  font-weight: bold;
  color: black;

  @media (max-width: 1024px) {
    padding: 0 1rem;
  }

  .UiSubheaderInner {
    max-width: 1024px;
    margin: 0 auto;
    height: 73px;

    display: flex;
    align-items: center;

    .UiSubheaderInnerBack {
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 0.5rem;
      border: none;
      border-radius: 50%;
      background: white;
      color: black;
      margin-right: 1rem;
      cursor: pointer;

      svg {
        width: 1.5rem;
        height: 1.5rem;
      }

      &:hover {
        background: rgb(var(--ui-border-rgb));
      }
    }

    img {
      height: 2rem;
      width: 2rem;
      border-radius: 2px;
      margin-right: 0.75rem;
    }

    .UiSubheaderInnerRight {
      margin-left: auto;
    }
  }
}

.UiSubheaderButton {
  padding: 0.5rem 1rem;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  font-weight: 500;
  text-transform: uppercase;
  color: white;
  text-decoration: none;
  background-color: black;
  border: none;
  cursor: pointer;

  &:hover {
    background-color: #222;
  }

  &:active {
    background-color: #333;
  }

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
}
</style>
