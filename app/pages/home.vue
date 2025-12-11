<script setup lang="ts">
definePageMeta({
  middleware: "auth",
});
const { pending, data: quests } = useLazyFetch("/api/quests/active");
</script>

<template>
  <div class="p-4 flex flex-col max-h-svh">
    <div class="h-[5svh] mb-2">
      <img class="h-full" src="/sidequests-alpha.gif" alt="sidequests" />
    </div>
    <div
      class="flex flex-col gap-y-4 w-full h-full overflow-scroll rounded-3xl"
    >
      <NuxtLoadingIndicator v-if="pending" />
      <LazyQuest
        v-for="quest in quests"
        v-else
        :key="quest.createdAt"
        :data="quest"
        hydrate-on-visible
      />
    </div>

    <!-- Spacing for Drawer -->
    <div class="mt-22"></div>
  </div>
</template>
