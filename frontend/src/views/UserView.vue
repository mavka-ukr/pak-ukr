<script setup lang="ts">
import UiHeader from "@/components/layout/UiHeader.vue";
import UiFooter from "@/components/layout/UiFooter.vue";
import UiContent from "@/components/layout/UiContent.vue";
import UiTabs from "@/components/layout/UiTabs.vue";
import UiTab from "@/components/layout/UiTab.vue";
import { computed, onBeforeMount, ref } from "vue";
import UiSubheader from "@/components/layout/UiSubheader.vue";
import { useRoute } from "vue-router";
import type PakUser from "@/application/models/PakUser";
import { Pak } from "@/application";
import UiPakList from "@/components/paks/UiPakList.vue";
import UiPakItem from "@/components/paks/UiPakItem.vue";
import UiThread from "@/components/layout/UiThread.vue";

const route = useRoute();

const user = ref<PakUser>(Pak.me!.user);

const tab = ref("паки");
const isPaksTab = computed(() => tab.value === "паки");
const isReviewsTab = computed(() => tab.value === "відгуки");
const isDiscussionTab = computed(() => tab.value === "обговорення");

onBeforeMount(() => {
  setTab((route.query["вкладка"] as string) || "паки");
});

function setTab(t: string) {
  tab.value = t;
}
</script>

<template>
  <main>
    <UiHeader />
    <UiSubheader style="margin-bottom: 0">МТП</UiSubheader>

    <UiContent>
      <div class="UiContentWrapper">
        <div class="PageGrid">
          <div class="PageGridLeft">
            <UiTabs inside with-subheader>
              <UiTab @click="setTab('паки')" :active="isPaksTab"> Паки</UiTab>
              <UiTab @click="setTab('відгуки')" :active="isReviewsTab">
                Відгуки
              </UiTab>
              <UiTab @click="setTab('обговорення')" :active="isDiscussionTab">
                Обговорення
              </UiTab>
            </UiTabs>
            <template v-if="isPaksTab">
              <div class="PageBlock paddingless">
                <UiThread :thread="user.paksThread">
                  <template #default="{ thread }">
                    <UiPakList inside>
                      <template
                        v-for="pak in thread.filteredItems"
                        :key="pak.data.id"
                      >
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
              </div>
            </template>
            <template v-if="isReviewsTab">
              <div class="PageBlock empty">Цей пак немає опису.</div>
            </template>
            <template v-if="isDiscussionTab">
              <div class="PageBlock empty">Цей пак немає опису.</div>
            </template>
          </div>
          <div class="PageGridRight">
            <div class="PageBlock">
              <div class="PageBlockAvatar">
                <img
                  src="https://avatars.githubusercontent.com/u/129215866?s=200&v=4"
                  alt=""
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </UiContent>

    <UiFooter />
  </main>
</template>

<style lang="scss">
.PageBlockAvatar {
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    width: 200px;
    height: 200px;
    border-radius: 2px;
  }
}
</style>
