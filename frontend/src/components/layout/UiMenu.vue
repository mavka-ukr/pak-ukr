<template>
  <div class="UiMenu">
    <slot />
  </div>
</template>

<style lang="scss">
.UiMenu {
  min-width: 150px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  .UiMenuItem + .UiMenuItem {
    border-top: 1px solid rgb(var(--ui-border-rgb));
  }
}
</style>
