<script setup lang="ts">
import type {Database, Tables, Enums} from "~/types/database.types";
import {gsap} from "gsap";

const props = defineProps<{
  data: Tables<"quests">
}>()

const questMaster = ref()
const questMasterLink = ref()

onMounted(async () => {
  await nextTick()
  // Wait for the next DOM update cycle
  const username = await getUsernameFromID(props.data.host_id)
  questMaster.value = username
  questMasterLink.value = `/quester/${username}`


  gsap.timeline()
      .set(".questPost", {opacity: 1})
      .from(".questPost", {xPercent: -200, duration: 0.5, ease: "ease.inOut"})

})

function startingIn(date: string) {
  const d = new Date(date).valueOf()
  const now = Date.now()

  const differenceInMs = d - now;

// Step-3 Convert to total seconds
  const totalSeconds = Math.floor(differenceInMs / 1000);

// Step-4 Derive hours, minutes, and seconds
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const hours = Math.floor(totalSeconds / 3600);
  const days = Math.floor(hours / 24);

  const startsIn = "starts in "

  if (days >= 1)
    return `${startsIn} ${days}d`;
  if (hours > 1)
    return `${startsIn} ${hours}h`;
  if (minutes >= 1)
    return `${startsIn} ${minutes}m`;
  else
    return "happening Right Now!"
}

function formatDate(date: string) {
  const d = new Date(date);
  const months = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'];
  const days = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];
  const month = months[d.getMonth()];

  const hours = d.getHours()
  const ampm = hours < 12 ? 'am' : 'pm'
  const getHour = hours > 12 ? hours - 12 : hours
  const getMinutes = d.getMinutes() < 10 ? '0' + d.getMinutes() : d.getMinutes()
  const time = `${getHour}:${getMinutes}${ampm}`

  return `${time} ${days[d.getDay()]} ${month} ${d.getDate()}`;
}

function getQuesters(data: string) {

}

function getComments() {

}

</script>

<template>
  <div class="questPost rounded-t-3xl bg-quest opacity-80 p-4 flex flex-col font-mono text-amber-50">
    <Quester :id="data.host_id"/>

    <i class="text-2xl font-extrabold mt-2">{{ data.title }}</i>
    <p class="text-sm">{{ data.description }}</p>

    <div class="bg-light-purple rounded-3xl p-4 mt-4">
      <div class="flex items-center">
        <UIcon name="material-symbols:map-pin-heart-rounded"></UIcon>
        <p>{{ data.location }}</p>
      </div>

      <p class="text-sm text-quest font-bold">{{ startingIn(data.start_time!) }}</p>
      <p>starts: {{ formatDate(data.start_time!) }}</p>
      <p>ends: {{ formatDate(data.end_time!) }}</p>
    </div>
  </div>
  <div>

  </div>
</template>

<style scoped>
.questPost {
  opacity: 0;
}
</style>