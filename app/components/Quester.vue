<script setup lang="ts">
import type {Tables} from "~/types/database.types";

const props = defineProps<{
  id: string
}>()

const quester = ref()
const questerLink = ref()
const magic = ref()

onMounted(async () => {
  await nextTick()
  // Wait for the next DOM update cycle
  const username = await getUsernameFromID(props.id)
  quester.value = username
  questerLink.value = `/quester/${username}`

  //set magic!
  const userData = await getUserDataFromID(props.id)
  magic.value = (userData?.quests_hosted + userData?.quests_completed) || 0
})
</script>

<template>
  <div class="rounded-full flex bg-violet p-3 size-fit items-center text-sm">
    <u>
      <NuxtLink :to="questerLink">{{ quester }}</NuxtLink>
    </u>

    <div class="ml-3 pl-2 flex items-center border-l-2 border-amber-50">
      <UIcon name="solar:star-fall-bold" class="scale-125"/>
      <p class="font-extrabold">{{ magic }}</p>
    </div>



  </div>

</template>

<style scoped>

</style>