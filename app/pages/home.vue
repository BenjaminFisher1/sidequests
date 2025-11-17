<script setup lang="ts">
const loading = ref(false)
const quests = ref()

onBeforeMount(async () => {
  loading.value = true
  try {
    const temp = await $fetch('/api/quests/active')
    quests.value = temp
  } catch (error) {
    console.log(error)
  } finally {
    loading.value = false
  }
})

</script>

<template>
  <div class="p-4 flex flex-col">
    <img class="w-60 mb-4" src="~/assets/sidequests.gif" alt="sidequests"/>
    <div class="flex flex-col gap-y-4 w-full">
      <Quest v-for="quest in quests" :data="quest"/>
    </div>

  </div>

  <!--  <Drawer/>-->
</template>

<style scoped>

</style>