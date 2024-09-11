<script setup lang="ts">
defineProps<{
  withSubheader?: boolean;
  inside?: boolean;
}>();
</script>

<template>
  <div class="UiTabs" :class="{ withSubheader, inside }">
    <div class="UiTabsInner">
      <slot />
    </div>
  </div>
</template>

<style lang="scss">
.UiTabs {
  position: sticky;
  top: 0;
  z-index: 99;
  height: 41px;
  background-color: white;
  border-bottom: 1px solid rgb(var(--ui-border-rgb));

  &.withSubheader {
    top: 72px;
  }

  &.inside {
    .UiTabsInner {
      > .UiTab:first-child {
        border-left: none;
      }
    }
  }
}

.UiTabsInner {
  max-width: 1024px;
  margin: 0 auto;

  display: flex;
  align-items: center;
}
</style>
