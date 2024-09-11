<script setup lang="ts">
defineProps<{
  active?: boolean;
}>();
</script>

<template>
  <div class="UiTab" :class="{ active }">
    <slot />
  </div>
</template>

<style lang="scss">
.UiTab {
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 1rem;
  border-left: 1px solid rgb(var(--ui-border-rgb));
  font-size: 0.8rem;
  font-weight: bold;
  text-transform: uppercase;
  cursor: pointer;

  &:hover {
    background-color: rgb(var(--ui-border-rgb));
  }

  &.active {
    background-color: black;
    color: white;
  }

  &:last-child {
    border-right: 1px solid rgb(var(--ui-border-rgb));
  }

  @media (max-width: 1024px) {
    &:first-child {
      border-left: none;
    }

    &:last-child {
      border-right: none;
    }
  }
}
</style>
