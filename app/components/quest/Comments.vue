<script setup lang="ts">
import * as z from "zod";
import type { Comment } from "~~/shared/utils/schemas";
import type { FormSubmitEvent } from "#ui/types";

const props = defineProps<{
  questId: string;
}>();

const { data: commentsData, refresh } = await useFetch(
  `/api/quests/${props.questId}/comments`,
);

const comments = commentsData.value ? (commentsData!.value as Comment[]) : [];

type Schema = z.output<typeof CommentSchema>;

const state = reactive<Partial<Schema>>({
  content: undefined,
});

async function onSubmit(event: FormSubmitEvent<Schema>) {
  await $fetch(`/api/quests/${props.questId}/comments`, {
    method: "post",
    body: { questId: props.questId, content: event.data.content },
  });

  await refresh();
}
</script>

<template>
  <div class="rounded-b-3xl p-4 flex flex-col font-mono">
    <p class="text-md font-bold">comments ({{ comments.length }})</p>

    <!--    sort by recent-->
    <div class="flex flex-col-reverse">
      <LazyQuestComment
        v-for="comment in comments"
        :data="comment"
        :key="comment.createdAt"
        class="mb-2"
      />
    </div>

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

<style scoped></style>
