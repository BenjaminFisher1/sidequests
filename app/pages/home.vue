<script setup lang="ts">
definePageMeta({
  middleware: "auth",
});
const { pending, data: quests } = useFetch("/api/quests/active", {
  lazy: false,
});
</script>

<template>
  <div>
    <div class="p-4 flex flex-col">
      <img class="w-60 mb-4" src="~/assets/sidequests.gif" alt="sidequests" />
      <div class="flex flex-col-reverse gap-y-4 w-full">
        <NuxtLoadingIndicator v-if="pending" />
        <LazyQuestsQuest
          v-for="quest in quests"
          v-else
          :key="quest.createdAt"
          :data="quest"
        />
      </div>
    </div>
    <Drawer />
  </div>
</template>

<style scoped></style>
