<script setup lang="ts">
defineProps<{
  inside?: boolean;
}>();
</script>

<template>
  <div class="UiPakVersionList" :class="{ inside }">
    <slot />
  </div>
</template>

<style lang="scss">
.UiPakVersionList {
  display: flex;
  flex-direction: column;
}

.UiPakVersionListLoading {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100px;
  color: #666;
}

.UiPakVersionListError {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100px;
  color: #f00;
}

.UiPakVersionListLoadingNext {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50px;
  color: #666;
}

.UiPakVersionListErrorNext {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50px;
  color: #f00;
}

.UiPakVersionListNoMore {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50px;
  color: #666;
}

.UiPakVersionListEmpty {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100px;
  color: #666;
}
</style>
