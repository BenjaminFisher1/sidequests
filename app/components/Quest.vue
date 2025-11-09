<script setup lang="ts">
import type {Tables} from "~/types/database.types";
import {gsap} from "gsap";
import JoinQuest from "~/components/JoinQuest.vue";

const props = defineProps<{
  data: any
}>()

const questMaster = ref()
const questMasterLink = ref()
const comment = ref('')

onMounted(async () => {
  await nextTick()
  // Wait for the next DOM update cycle
  console.log("data", await props.data.value)
  const username = await getUsernameFromID(props.data.host_id)
  console.log("user", username)
  questMaster.value = username
  questMasterLink.value = `/quester/${username}`


  gsap.timeline()
      .set(".questPost", {opacity: 1})
      .from(".questPost", {xPercent: -200, duration: 0.5, ease: "ease.inOut"})

})

function whenIsQuest(start: string, end: string) {
  const differenceFromStart = new Date(start).valueOf() - Date.now();
  const differenceFromEnd = new Date(end).valueOf() - Date.now()

  if(differenceFromStart < 0 && differenceFromEnd > 0) return "quest in progress!"
  if(differenceFromEnd < 0) return "quest inactive!"

// Step-3 Convert to total seconds
  const totalSeconds = Math.floor(differenceFromStart / 1000);

// Step-4 Derive hours, minutes, and seconds
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const hours = Math.floor(totalSeconds / 3600);
  const days = Math.floor(hours / 24);

  const startsIn = "quest starts in "

  if (days >= 1)
    return `${startsIn} ${days} days`;
  if (hours > 1)
    return `${startsIn} ${hours} hours`;
  if (minutes >= 1)
    return `${startsIn} ${minutes} mins`;
  else
    return "happening Right Now!"
}

const comments = await fetchRows("comments", "quest_id", props.data.id)
console.log(comments)
</script>

<template>
  <div class="questPost opacity-80">
    <div class="rounded-t-3xl bg-quest p-4 flex flex-col font-mono text-amber-50">
      <Quester :id="data.host_id"/>

      <i class="text-2xl font-extrabold mt-2">{{ data.title }}</i>
      <p class="text-sm">{{ data.description }}</p>

      <div class="bg-light-purple rounded-3xl p-4 my-4">
        <div class="flex items-center">
          <UIcon name="material-symbols:map-pin-heart-rounded"></UIcon>
          <p>{{ data.location }}</p>
        </div>

        <p class="text-sm text-quest font-bold">{{ whenIsQuest(data.start_time!, data.end_time!) }}</p>
        <p>starts: {{ formatDate(data.start_time!) }}</p>
        <p>ends: {{ formatDate(data.end_time!) }}</p>
      </div>

      <div class="grid grid-cols-3">
        <Huzzah class="justify-start" :questID="data.id"/>

        <div></div>

        <JoinQuest :questID="data.id"></JoinQuest>
      </div>
    </div>
    <div class="rounded-b-3xl p-4 bg-aqua">
      <p class="text-sm">comments</p>

      <Comment v-for="comment in comments" :data="comment"></Comment>

      <div class="flex">
        <UTextarea class="mt-3 rounded-3xl w-full" v-model="comment" placeholder="leave a comment!" />

      </div>
    </div>
  </div>
 </template>

<style scoped>
.questPost {
  opacity: 0;
}
</style>