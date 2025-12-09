<script setup lang="ts">
const { data: requests } = await useFetch("/api/buddies/requests");
</script>

<template>
  <div class="">
    <p class="text-4xl font-extrabold">your Magical inbox...</p>
  </div>
</template>

<style scoped></style>
