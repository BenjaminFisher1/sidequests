<script setup lang="ts">
import * as z from "zod";
import type { FormSubmitEvent } from "@nuxt/ui";

const props = defineProps<{
  questId: string;
}>();

type Schema = z.output<typeof CommentSchema>;

const state = reactive<Partial<Schema>>({
  content: "",
});

async function onSubmit(event: FormSubmitEvent<Schema>) {
  await $fetch(`/api/quests/${props.questId}/comments`, {
    method: "post",
    body: { questId: props.questId, content: event.data.content },
  });

  //clear text field
  state.content = "";

  await refresh();
}

const {
  data: comments,
  refresh,
  pending,
} = await useLazyFetch(`/api/quests/${props.questId}/comments`, {});
</script>

<template>
  <USlideover side="right" :ui="{ body: 'p-0' }">
    <UButton
      color="neutral"
      trailing-icon="pixelarticons:arrow-right"
      size="xl"
      block
      class="p-2"
      >open comments</UButton
    >

    <template #header>
      <p class="font-scroll font-bold text-3xl w-fit">comments</p>
    </template>

    <template #body>
      <div
        class="bg-[url('~/assets/starbg.gif')] bg-center w-full h-full p-4 text-text overflow-y-scroll"
      >
        <div class="flex flex-col gap-2 justify-center">
          <LazyQuestComment
            v-for="comment in comments"
            :data="comment"
            :key="comment.createdAt"
            hydrate-on-visible
          />
        </div>
      </div>
    </template>

    <template #footer="{ close }">
      <div class="relative w-full">
        <UButton
          color="error"
          icon="pixelarticons:close"
          size="xl"
          class="absolute right-0 top-0"
          @click="close"
        ></UButton>

        <UForm
          :schema="CommentSchema"
          :state="state"
          @submit="onSubmit"
          class="flex mt-3 gap-2 w-full"
        >
          <UFormField name="content">
            <UTextarea
              v-model="state.content"
              class="rounded-3xl w-full"
              placeholder="leave a comment!"
              autoresize
              cols="30"
            />
          </UFormField>

          <UButton
            type="submit"
            icon="material-symbols:send-rounded"
            size="md"
            color="neutral"
            variant="solid"
            class="rounded-3xl"
          />
        </UForm>
      </div>
    </template>
  </USlideover>
</template>

<style scoped></style>
