<script setup lang="ts">
const test = useSupabaseClient()

const {data} = await test.from("quests").select()
console.log(data)
</script>

<template>
  <div class="flex flex-col gap-y-4 w-full p-4">
    <Quest v-for="quest in data" :data="quest"/>

  </div>

  <Drawer/>
</template>

<style scoped>

</style>