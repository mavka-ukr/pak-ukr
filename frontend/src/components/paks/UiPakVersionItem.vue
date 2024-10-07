<script setup lang="ts">
import PakPakVersion from "@/application/models/PakPakVersion";
import PakPak from "@/application/models/PakPak";

defineProps<{
  pak: PakPak;
  pakVersion: PakPakVersion;
}>();
</script>

<template>
  <div class="UiPakVersionItem">
    <div class="UiPakVersionItemHead">
      <RouterLink
        :to="encodeURI(`/${pak.data.name}/${pakVersion.data.name}`)"
        class="UiPakVersionItemTitle"
      >
        {{ pakVersion.data.name }}
      </RouterLink>
    </div>
    <template v-if="pakVersion.data.description">
      <div class="UiPakVersionItemDescription">
        {{ pakVersion.data.description }}
      </div>
    </template>
    <div class="UiPakVersionItemFooter">
      <!--      <template v-if="pakVersion.data.file">-->
      <!--        <a :href="pakVersion.data.file" class="UiPakVersionItemFooterItem">-->
      <!--          Завантажити-->
      <!--        </a>-->
      <!--      </template>-->
    </div>
  </div>
</template>

<style lang="scss">
.UiPakVersionItem {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  background: white;
  border-bottom: 1px solid rgb(var(--ui-border-rgb));
  padding: 1rem;

  & + & {
    border-top: 0;
  }

  .UiPakVersionItemHead {
    display: flex;
    align-items: center;
  }

  .UiPakVersionItemTitle {
    font-size: 1.25rem;
    font-weight: bold;
    color: black;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }

  .UiPakVersionItemDescription {
    margin-top: 0.5rem;
  }

  .UiPakVersionItemFooter {
    margin-top: 1rem;
    display: flex;
    align-items: center;

    &:empty {
      margin-top: 0;
    }

    .UiPakVersionItemFooterItem {
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
