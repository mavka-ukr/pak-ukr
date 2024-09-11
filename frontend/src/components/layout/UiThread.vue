<script setup lang="ts">
import type { AbstractInfiniteThread } from "@/application/threads";
import { onBeforeMount } from "vue";
import { handlePageScrollAtBottom } from "@/application/ui/scroll";

const props = defineProps<{
  thread: AbstractInfiniteThread<any>;
}>();

handlePageScrollAtBottom(() => {
  props.thread.loadNext();
});

onBeforeMount(() => {
  props.thread.resetAndLoadInitial();
});
</script>

<template>
  <template v-if="thread.data.isLoadingInitial">
    <slot name="loading" :thread="thread" />
  </template>
  <template v-else-if="thread.data.error">
    <slot name="error" :thread="thread" :error="thread.data.error" />
  </template>
  <template v-else>
    <template v-if="thread.filteredItems.length">
      <slot :thread="thread" />
      <template v-if="thread.data.isLoadingNext">
        <slot name="loadingNext" :thread="thread" />
      </template>
      <template v-else-if="thread.data.error">
        <slot name="errorNext" :thread="thread" :error="thread.data.error" />
      </template>
      <template v-else-if="!thread.data.hasNext">
        <slot name="noMore" :thread="thread" />
      </template>
    </template>
    <template v-else>
      <slot name="empty" :thread="thread" />
    </template>
  </template>
</template>
