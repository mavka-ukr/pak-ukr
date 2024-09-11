<template>
  <div class="UiContent">
    <slot />
  </div>
</template>

<style lang="scss">
.UiContent {
  max-width: 1024px;
  min-height: calc(100vh - 40px - 73px - 40px - 150px);
  margin: 0 auto;
  margin-bottom: 150px;
}
</style>
