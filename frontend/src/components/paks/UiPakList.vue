<script setup lang="ts">
defineProps<{
  inside?: boolean;
}>();
</script>

<template>
  <div class="UiPakList" :class="{ inside }">
    <slot />
  </div>
</template>

<style lang="scss">
.UiPakList {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  grid-gap: 1rem;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
    grid-gap: 0;
  }

  &.inside {
    grid-gap: 0;
    border-bottom: 1px solid rgb(var(--ui-border-rgb));

    .UiPakItem {
      margin-bottom: -1px;
      margin-right: -1px;
      border: none;
      border-right: 1px solid rgb(var(--ui-border-rgb));
      border-bottom: 1px solid rgb(var(--ui-border-rgb));

      @media (max-width: 1024px) {
        grid-template-columns: 1fr;
        grid-gap: 0;
        border-right: 1px solid transparent;
      }
    }
  }
}

.UiPakListLoading {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100px;
  color: #666;
}

.UiPakListError {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100px;
  color: #f00;
}

.UiPakListLoadingNext {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50px;
  color: #666;
}

.UiPakListErrorNext {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50px;
  color: #f00;
}

.UiPakListNoMore {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50px;
  color: #666;
}

.UiPakListEmpty {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100px;
  color: #666;
}
</style>
