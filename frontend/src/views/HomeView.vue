<script setup lang="ts">
import UiHeader from "@/components/layout/UiHeader.vue";
import UiHero from "@/components/layout/UiHero.vue";
import UiPakList from "@/components/paks/UiPakList.vue";
import UiPakItem from "@/components/paks/UiPakItem.vue";
import UiFooter from "@/components/layout/UiFooter.vue";
import UiContent from "@/components/layout/UiContent.vue";
</script>

<template>
  <main>
    <UiHeader />
    <UiHero />

    <UiContent>
      <UiPakList>
        <UiPakItem />
        <UiPakItem />
        <UiPakItem />
        <UiPakItem />
        <UiPakItem />
        <UiPakItem />
        <UiPakItem />
        <UiPakItem />
        <UiPakItem />
        <UiPakItem />
        <UiPakItem />
        <UiPakItem />
        <UiPakItem />
        <UiPakItem />
      </UiPakList>
    </UiContent>

    <UiFooter />
  </main>
</template>
