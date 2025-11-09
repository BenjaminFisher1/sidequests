<script setup lang="ts">
const test = useSupabaseClient()

const {data} = await test.from("quests").select()
console.log(data)
</script>

<template>
  <div class="p-4 flex flex-col">
    <img class="w-60 mb-4" src="~/assets/sidequests.gif" alt="sidequests" />
    <div class="flex flex-col gap-y-4 w-full">
      <Quest v-for="quest in data" :data="quest"/>
    </div>

  </div>

  <Drawer/>
</template>

<style scoped>

</style>