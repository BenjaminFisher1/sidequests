<script setup lang="ts">
import * as z from "zod";
import type { FormSubmitEvent } from "@nuxt/ui";

const schema = z.object({
  title: z.string("label thy quest!").min(8, "Must be at least 8 characters"),
  description: z
    .string("describe thy quest!")
    .min(8, "Must be at least 8 characters"),
  image: z.file().optional(),
  startTime: z.iso.datetime({ local: true, error: "enter a start date!" }),
  endTime: z.iso.datetime({ local: true, error: "enter an end date!" }),
  location: z.string("provide a location for thy quest!"),
});

type Schema = z.output<typeof schema>;

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
  const formData = event.data;
  console.log(event.data);

  // const imageFile = event.data.image;
  // let imageStoragePath;
  // if (imageFile) {
  //   const { data, error } = await client.storage
  //     .from("images")
  //     .upload(`public/${imageFile?.name}`, imageFile);
  //
  //   if (error) toastError(error.message);
  //   else imageStoragePath = data?.fullPath;
  // }

  await $fetch("/api/quests/create", {
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
  <div
    id="container"
    class="font-scroll text-black h-screen w-screen flex flex-col p-6"
  >
    <p class="text-5xl">make a quest</p>
    <UForm :schema="schema" :state="state" class="space-y-4" @submit="onSubmit">
      <UFormField label="title" name="title" class="text-3xl">
        <UInput v-model="state.title" placeholder="name thy quest!" />
      </UFormField>

      <UFormField label="description" name="description">
        <UInput v-model="state.description" placeholder="describe thy quest!" />
      </UFormField>

      <UFormField label="start date" name="startDate">
        <input v-model="state.startTime" type="datetime-local" />
      </UFormField>

      <UFormField label="end date" name="endDate">
        <input v-model="state.endTime" type="datetime-local" />
      </UFormField>

      <UFormField label="location" name="location">
        <UInput v-model="state.location" placeholder="where is thy quest?" />
      </UFormField>

      <UFormField label="imagery" name="imageURL">
        <UFileUpload
          v-model="state.image"
          label="upload thy image here!"
          class="w-75 min-h-48"
        />
      </UFormField>

      <UButton type="submit"> Submit </UButton>
    </UForm>
  </div>
</template>

<style scoped>
#container {
  background: url("~/assets/papertexture.gif") no-repeat center;
  background-size: cover;
  font-size: 3rem;
}

div label {
  font-size: 2rem;
}
</style>
