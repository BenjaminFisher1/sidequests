<script setup lang="ts">
const props = defineProps<{
  profileId: string;
  username: string;
}>();
// const { data: buddies } = await useFetch("/api/buddies");
//
// console.log("idk: ", buddies.value);
</script>

<template>
  <USlideover side="top" close-icon="pixelarticons:close">
    <UButton label="Open" color="neutral" variant="subtle" />

    <template #header>
      <p class="font-scroll font-bold text-3xl">{{ username }}'s buddies</p>
    </template>

    <template #body>
      <div class="w-10 m-4 h-full">
        <!--        <Quester v-for="buddy in buddies" :id="buddy."></Quester>-->
      </div>
    </template>
  </USlideover>
</template>

<style scoped></style>
