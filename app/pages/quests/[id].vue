<script setup lang="ts">
const { data: quest } = useFetch("/api/quests/id", {
  method: "post",
  body: { id: useRoute().params.id },
});
</script>

<template>
  <div class="p-4 flex flex-col items-center h-full">
    <Quest :data="quest" />
  </div>
</template>

<style scoped></style>
