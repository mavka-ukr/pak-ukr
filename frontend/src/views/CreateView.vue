<script setup lang="ts">
import UiHeader from "@/components/layout/UiHeader.vue";
import UiFooter from "@/components/layout/UiFooter.vue";
import UiContent from "@/components/layout/UiContent.vue";
import UiSubheader from "@/components/layout/UiSubheader.vue";
import { Pak } from "@/application";
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const data = reactive({
  name: "",
  description: "",
  docsUrl: "",
  sourceUrl: "",
});
const isSubmitting = ref(false);

function submit() {
  isSubmitting.value = true;
  Pak.createPak(data)
    .then((pak) => {
      router.replace(encodeURI(`/${pak.data.name}`));
      isSubmitting.value = false;
    })
    .catch(() => {
      isSubmitting.value = false;
    });
}
</script>

<template>
  <main>
    <UiHeader />
    <UiSubheader style="margin-bottom: 0">
      Створити пак
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
            <input v-model="data.name" type="text" placeholder="Назва" />
            <input
              v-model="data.description"
              type="text"
              placeholder="Короткий опис"
            />
            <input
              v-model="data.docsUrl"
              type="url"
              placeholder="Посилання на документацію"
            />
            <input
              v-model="data.sourceUrl"
              type="url"
              placeholder="Посилання на код"
            />
          </form>
        </div>
      </div>
    </UiContent>

    <UiFooter />
  </main>
</template>

<style lang="scss">
form {
  input + input {
    margin-top: 0.5rem;
  }
}
</style>
