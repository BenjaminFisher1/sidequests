<script setup lang="ts">
const {data: data} = await useAsyncData(async () => {
  const {data} = await useSupabaseClient().from("quests").select()
  return data
})


onMounted(async () => {
  // Wait for the next DOM update cycle
  await nextTick()

  console.log(data.value)
})


// console.log("quests", data.value)
</script>

<template>
  <div>
    <div class="p-4 flex flex-col">
      <img class="w-60 mb-4" src="~/assets/sidequests.gif" alt="sidequests"/>
      <div class="flex flex-col gap-y-4 w-full">
        <Quest v-for="quest in data" :data="quest"/>
      </div>

    </div>

    <Drawer/>
  </div>
</template>

<style scoped>

</style>