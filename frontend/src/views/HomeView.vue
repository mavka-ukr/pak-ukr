<script setup lang="ts">
import UiHeader from "@/components/layout/UiHeader.vue";
import UiHero from "@/components/layout/UiHero.vue";
import UiPakList from "@/components/paks/UiPakList.vue";
import UiPakItem from "@/components/paks/UiPakItem.vue";
import UiFooter from "@/components/layout/UiFooter.vue";
import UiContent from "@/components/layout/UiContent.vue";
import UiThread from "@/components/layout/UiThread.vue";
import { Pak } from "@/application";
</script>

<template>
  <main>
    <UiHeader />
    <UiHero />

    <UiContent>
      <UiThread :thread="Pak.recentPaksThread">
        <template #default="{ thread }">
          <UiPakList inside>
            <template v-for="pak in thread.filteredItems" :key="pak.data.id">
              <UiPakItem :pak="pak" />
            </template>
          </UiPakList>
        </template>
        <template #loading>
          <div class="UiPakListLoading">Завантаження...</div>
        </template>
        <template #error>
          <div class="UiPakListError">Помилка!</div>
        </template>
        <template #loadingNext>
          <div class="UiPakListLoadingNext">Завантаження...</div>
        </template>
        <template #errorNext>
          <div class="UiPakListErrorNext">Помилка!</div>
        </template>
        <template #noMore>
          <div class="UiPakListNoMore">Більше немає...</div>
        </template>
        <template #empty>
          <div class="UiPakListEmpty">Пусто...</div>
        </template>
      </UiThread>
    </UiContent>

    <UiFooter />
  </main>
</template>
