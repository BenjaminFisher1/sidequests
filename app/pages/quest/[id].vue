<script setup lang="ts">
const { data: quest } = await useFetch(`/api/quests/${useRoute().params.id}`);

useSeoMeta({
  title: quest.value.title,
  description: quest.value.description,
  ogDescription: quest.value.description,
});
</script>

<template>
  <div class="p-4 flex flex-col items-center h-full">
    <Quest :data="quest" />
  </div>
</template>

<style scoped></style>
