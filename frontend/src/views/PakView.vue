<script setup lang="ts">
import UiHeader from "@/components/layout/UiHeader.vue";
import UiFooter from "@/components/layout/UiFooter.vue";
import UiContent from "@/components/layout/UiContent.vue";
import UiSubheader from "@/components/layout/UiSubheader.vue";
import UiTabs from "@/components/layout/UiTabs.vue";
import UiTab from "@/components/layout/UiTab.vue";
import { computed, onBeforeMount, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import PakPak from "@/application/models/PakPak";
import { Pak } from "@/application";
import UiThread from "@/components/layout/UiThread.vue";
import UiPakVersionList from "@/components/paks/UiPakVersionList.vue";
import UiPakVersionItem from "@/components/paks/UiPakVersionItem.vue";
import PakPakVersion from "@/application/models/PakPakVersion";

const route = useRoute();
const router = useRouter();

const tab = ref("деталі");

const routePakName = computed(() => route.params.name as string);
const routerPakVersionName = computed(() => route.params.version as string);
const pak = computed(() => {
  return PakPak.findByName(routePakName.value);
});
const pakVersion = computed(() => {
  if (pak.value) {
    if (routerPakVersionName.value) {
      return PakPakVersion.findByPakIdAndName(
        pak.value.data.id,
        routerPakVersionName.value,
      );
    } else {
      return pak.value.data.version;
    }
  }
  return null;
});

const isDetailsTab = computed(() => tab.value === "деталі");
const isVersionsTab = computed(() => tab.value === "версії");
const isReviewsTab = computed(() => tab.value === "відгуки");
const isDiscussionTab = computed(() => tab.value === "обговорення");

function setTab(t: string) {
  tab.value = t;
}

onBeforeMount(() => {
  Pak.fetchPakByName({ name: routePakName.value }).then((pak) => {
    if (pak) {
      if (routerPakVersionName.value) {
        Pak.fetchPakVersionByPakIdAndName({
          pakId: pak.data.id,
          name: routePakName.value,
        });
      }
    }
  });
  setTab((route.query["вкладка"] as string) || "деталі");
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
        <template v-if="pakVersion">
          <span
            style="
              font-size: 1rem;
              margin-left: 0.5ch;
              background: black;
              color: white;
              border-radius: 0.5rem;
              padding: 0.1rem 0.3rem;
            "
          >
            {{ pakVersion.data.name }}
          </span>
        </template>
      </UiSubheader>
      <UiTabs with-subheader>
        <UiTab @click="setTab('деталі')" :active="isDetailsTab">Деталі</UiTab>
        <UiTab @click="setTab('версії')" :active="isVersionsTab">
          Версії
        </UiTab>
        <UiTab @click="setTab('відгуки')" :active="isReviewsTab">Відгуки</UiTab>
        <UiTab @click="setTab('обговорення')" :active="isDiscussionTab">
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
            <div class="PageGrid">
              <div class="PageGridLeft">
                <div class="PageBlock paddingless">
                  <UiThread :thread="pak.versionsThread">
                    <template #default="{ thread }">
                      <UiPakVersionList>
                        <template
                          v-for="pakVersion in thread.filteredItems"
                          :key="pakVersion.data.id"
                        >
                          <UiPakVersionItem
                            :pak="pak"
                            :pak-version="pakVersion"
                          />
                        </template>
                      </UiPakVersionList>
                    </template>
                    <template #loading>
                      <div class="UiPakVersionListLoading">Завантаження...</div>
                    </template>
                    <template #error>
                      <div class="UiPakVersionListError">Помилка!</div>
                    </template>
                    <template #loadingNext>
                      <div class="UiPakVersionListLoadingNext">
                        Завантаження...
                      </div>
                    </template>
                    <template #errorNext="{ error }">
                      <div class="UiPakVersionListErrorNext">{{ error }}</div>
                    </template>
                    <template #noMore>
                      <div class="UiPakVersionListNoMore">Більше немає...</div>
                    </template>
                    <template #empty>
                      <div class="UiPakVersionListEmpty">Пусто...</div>
                    </template>
                  </UiThread>
                </div>
              </div>
              <div class="PageGridRight">
                <div class="PageBlock">
                  <RouterLink
                    :to="pak.CreateVersionURLPath"
                    class="PageGridButton"
                  >
                    Створити версію
                  </RouterLink>
                </div>
              </div>
            </div>
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
