<script setup lang="ts">
import UiHeader from "@/components/layout/UiHeader.vue";
import UiFooter from "@/components/layout/UiFooter.vue";
import UiContent from "@/components/layout/UiContent.vue";
import UiSubheader from "@/components/layout/UiSubheader.vue";
import UiTabs from "@/components/layout/UiTabs.vue";
import UiTab from "@/components/layout/UiTab.vue";
import { computed, onBeforeMount, ref } from "vue";
import { useRoute } from "vue-router";
import PakPak from "@/application/models/PakPak";
import { Pak } from "@/application";

const route = useRoute();

const tab = ref("details");

const routePakName = computed(() => route.params.name as string);
const pak = computed(() => {
  return PakPak.findByName(routePakName.value);
});

const isDetailsTab = computed(() => tab.value === "details");
const isVersionsTab = computed(() => tab.value === "versions");
const isReviewsTab = computed(() => tab.value === "reviews");
const isDiscussionTab = computed(() => tab.value === "discussion");

function setTab(t: string) {
  tab.value = t;
}

onBeforeMount(() => {
  Pak.fetchPakByName({ name: routePakName.value });
});
</script>

<template>
  <main>
    <UiHeader />

    <template v-if="pak">
      <UiSubheader style="margin-bottom: 0">
        <template v-if="pak.data.logoUrl">
          <img :src="pak.data.logoUrl" alt="" />
        </template>
        {{ pak.data.name }}
      </UiSubheader>
      <UiTabs with-subheader>
        <UiTab @click="setTab('details')" :active="isDetailsTab">Деталі</UiTab>
        <UiTab @click="setTab('versions')" :active="isVersionsTab">
          Версії
        </UiTab>
        <UiTab @click="setTab('reviews')" :active="isReviewsTab">Відгуки</UiTab>
        <UiTab @click="setTab('discussion')" :active="isDiscussionTab">
          Обговорення
        </UiTab>
      </UiTabs>

      <UiContent>
        <div class="UiContentWrapper">
          <template v-if="isDetailsTab">
            <div class="PageGrid">
              <div class="PageGridLeft">
                <div class="PageBlock empty">Цей пак немає опису.</div>
              </div>
              <div class="PageGridRight">
                <div class="PageBlock">
                  <button class="PageGridButton">Завантажити</button>
                  <button class="PageGridButton">Документація</button>
                  <button class="PageGridButton">Код</button>
                </div>
              </div>
            </div>
          </template>
          <template v-if="isVersionsTab">
            <div class="PageBlock empty">Цей пак немає версій.</div>
          </template>
          <template v-if="isReviewsTab">
            <div class="PageBlock empty">Цей пак немає відгуків.</div>
          </template>
          <template v-if="isDiscussionTab">
            <div class="PageBlock empty">Цей пак немає обговорень.</div>
          </template>
        </div>
      </UiContent>
    </template>

    <UiFooter />
  </main>
</template>

<style lang="scss"></style>
