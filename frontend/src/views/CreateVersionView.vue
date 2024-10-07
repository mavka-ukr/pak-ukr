<script setup lang="ts">
import UiHeader from "@/components/layout/UiHeader.vue";
import UiFooter from "@/components/layout/UiFooter.vue";
import UiContent from "@/components/layout/UiContent.vue";
import UiSubheader from "@/components/layout/UiSubheader.vue";
import { Pak } from "@/application";
import { computed, onBeforeMount, reactive, ref } from "vue";
import PakPak from "@/application/models/PakPak";
import { useRoute } from "vue-router";

const route = useRoute();

const routePakName = computed(() => route.params.name as string);
const pak = computed(() => {
  return PakPak.findByName(routePakName.value);
});

const data = reactive({
  name: "",
  description: "",
  fileId: 0,
});
const file = ref<File | null>(null);
const isSubmitting = ref(false);

onBeforeMount(() => {
  Pak.fetchPakByName({ name: routePakName.value });
});

function submit() {
  if (pak.value) {
    isSubmitting.value = true;
    Pak.createPakVersion(pak.value.data.id, data)
      .then(() => {
        isSubmitting.value = false;
      })
      .catch(() => {
        isSubmitting.value = false;
      });
  }
}

function onFileInput() {}
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
        <span style="font-size: 1rem; margin-left: 0.5ch; margin-right: 0.5ch">
          /
        </span>
        Створити версію
        <template #right>
          <button
            @click="submit"
            :disabled="isSubmitting"
            class="UiSubheaderButton"
          >
            Зберегти
          </button>
        </template>
      </UiSubheader>

      <UiContent>
        <div class="UiContentWrapper">
          <div class="PageBlock">
            <form action="">
              <input
                v-model="data.name"
                type="text"
                placeholder="Версія (а.б.в)"
              />
              <textarea
                v-model="data.description"
                type="text"
                placeholder="Опис (зміни)"
              />
              <input
                @input="onFileInput"
                type="file"
                accept="application/zip"
                placeholder="Файл"
              />
            </form>
          </div>
        </div>
      </UiContent>
    </template>

    <UiFooter />
  </main>
</template>

<style lang="scss">
form {
  input + input {
    margin-top: 0.5rem;
  }

  input + textarea {
    margin-top: 0.5rem;
  }

  textarea + input {
    margin-top: 0.5rem;
  }
}
</style>
