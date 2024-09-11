<script setup lang="ts">
withDefaults(
  defineProps<{
    component?: any;
  }>(),
  {
    component: "div",
  },
);
</script>

<template>
  <component :is="component" class="UiMenuItem">
    <slot />
  </component>
</template>

<style lang="scss">
.UiMenuItem {
  width: 100%;
  display: flex;
  align-items: center;
  padding: 0.5rem 1rem;
  border-radius: 0;
  font-size: 1rem;
  text-align: left;
  border: none;
  cursor: pointer;
  color: black;
  text-decoration: none;
  background-color: white;

  &:hover {
    background-color: rgb(var(--ui-border-rgb));
  }
}
</style>
