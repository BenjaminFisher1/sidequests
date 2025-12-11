<script setup lang="ts">
import CommentsTab from "~/components/quest/CommentsTab.vue";

const props = defineProps<{
  questId: string;
}>();

const {
  data: comments,
  refresh,
  pending,
} = await useFetch(`/api/quests/${props.questId}/comments`, {
  query: { limit: 5 },
});

const { data: length } = await useFetch(
  `/api/quests/${props.questId}/comments/length`,
);
</script>

<template>
  <div class="rounded-b-3xl p-4 flex flex-col font-mono">
    <p class="text-md font-bold">comments ({{ length }})</p>

    <NuxtLoadingIndicator v-if="pending" />

    <div v-else class="flex flex-col gap-2">
      <div class="grid grid-cols-2 grid-flow-row-dense items-center gap-2">
        <LazyQuestComment
          v-for="comment in comments"
          :data="comment"
          :key="comment.createdAt"
        />
      </div>

      <CommentsTab :questId="questId" />
    </div>
  </div>
</template>

<style scoped></style>
