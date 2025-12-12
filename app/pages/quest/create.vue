<script setup lang="ts">
import * as z from "zod";
import type { FormSubmitEvent } from "@nuxt/ui";

definePageMeta({
  middleware: "auth",
});

type Schema = z.output<typeof FormSchema>;

const state = reactive<Partial<Schema>>({
  title: undefined,
  description: undefined,
  image: undefined,
  startTime: undefined,
  endTime: undefined,
  location: undefined,
});

const toast = useToast();

async function onSubmit(event: FormSubmitEvent<Schema>) {
  await $fetch("/api/quests", {
    method: "post",
    body: { data: event.data },
  })
    .then(() => {
      toast.add({
        title: "INCREDIBLE!",
        description: "HUZZAH! ADVENTURE AWAITS!",
        color: "success",
      });
      navigateTo("/home");
    })
    .catch((error) => {
      toastError(error.message);
    });
}
</script>

<template>
  <div id="container" class="h-screen w-screen flex flex-col p-6">
    <p class="text-5xl text-black font-extrabold font-scroll">make a quest</p>
    <UForm
      :schema="FormSchema"
      :state="state"
      class="space-y-4 text-black mb-22"
      @submit="onSubmit"
    >
      <UFormField label="title" name="title" size="xl">
        <UTextarea
          v-model="state.title"
          placeholder="name thy quest!"
          autoresize
        />
      </UFormField>

      <UFormField label="description" name="description" size="xl">
        <UTextarea
          v-model="state.description"
          placeholder="describe thy quest!"
          autoresize
        />
      </UFormField>

      <UFormField label="start date" name="startDate" size="xl">
        <input v-model="state.startTime" type="datetime-local" />
      </UFormField>

      <UFormField label="end date" name="endDate" size="xl">
        <input v-model="state.endTime" type="datetime-local" />
      </UFormField>

      <UFormField label="location" name="location" size="xl">
        <UInput
          v-model="state.location"
          icon="material-symbols:map-pin-heart-rounded"
          placeholder="where is thy quest?"
        />
      </UFormField>

      <UButton
        type="submit"
        icon="streamline-pixel:content-files-quill-ink"
        size="xl"
      >
        Submit
      </UButton>
    </UForm>
  </div>
</template>

<style scoped>
#container {
  background: url("~/assets/papertexture.gif") no-repeat center;
  background-size: cover;
}

label {
  color: white;
}

div label {
  font-size: 2rem;
}
</style>
