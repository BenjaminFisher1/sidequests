<script setup lang="ts">
import Questers from "~/components/quest/Questers.vue";
import Comments from "~/components/quest/Comments.vue";

const props = defineProps<{
  data: Quest;
}>();

onMounted(async () => {
  await nextTick();
  // Wait for the next DOM update cycle

  // gsap.timeline()
  //     .set(".questPost", {opacity: 1})
  //     .from(".questPost", {xPercent: -200, duration: 0.5, ease: "ease.inOut"})
});

function whenIsQuest(start: string, end: string) {
  const differenceFromStart = new Date(start).valueOf() - Date.now();
  const differenceFromEnd = new Date(end).valueOf() - Date.now();

  if (differenceFromStart < 0 && differenceFromEnd > 0)
    return "quest in progress!";
  if (differenceFromEnd < 0) return "quest inactive!";

  // Convert to total seconds
  const totalSeconds = Math.floor(differenceFromStart / 1000);

  // Derive hours, minutes, and seconds
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const hours = Math.floor(totalSeconds / 3600);
  const days = Math.floor(hours / 24);

  const startsIn = "quest starts in ";

  if (days >= 1) return `${startsIn} ${days} days`;
  if (hours > 1) return `${startsIn} ${hours} hours`;
  if (minutes >= 1) return `${startsIn} ${minutes} mins`;
  else return "happening Right Now!";
}
</script>

<template>
  <div class="questPost opacity-80">
    <div
      class="rounded-t-3xl bg-quest p-4 flex flex-col font-mono text-amber-50"
    >
      <Quester :id="data.hostId" />

      <i class="text-2xl font-extrabold mt-2">{{ data.title }}</i>
      <p class="text-sm">{{ data.description }}</p>

      <div class="bg-light-purple rounded-3xl p-4 my-4">
        <div class="flex items-center">
          <UIcon name="material-symbols:map-pin-heart-rounded" class="mr-1" />
          <p>{{ data.location }}</p>
        </div>

        <p class="text-sm text-quest font-bold">
          {{ whenIsQuest(data.startTime, data.endTime) }}
        </p>
        <p>starts: {{ formatDate(data.startTime) }}</p>
        <p>ends: {{ formatDate(data.endTime) }}</p>
      </div>

      <Questers :questId="data.id" />

      <div class="flex gap-2">
        <UButton
          icon="material-symbols:share"
          color="secondary"
          size="md"
          variant="subtle"
        />

        <UButton
          icon="material-symbols:send-rounded"
          color="secondary"
          size="md"
          variant="subtle"
        />
      </div>
    </div>

    <Comments :questId="props.data.id" />
  </div>
</template>

<style scoped></style>
