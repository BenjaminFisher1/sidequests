<script setup lang="ts">
import Questers from "~/components/quest/Questers.vue";
import CommentsPreview from "~/components/quest/CommentsPreview.vue";

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

async function copyLink() {
  const link = `https://${window.location.host}/quest/${props.data.id}`;

  try {
    await navigator.clipboard.writeText(link);
    useToast().add({ title: "Quest link copied to clipboard!" });
  } catch (err) {
    console.error("Failed to copy: ", err);
  }
}
</script>

<template>
  <div class="questPost opacity-80 rounded-3xl">
    <div class="p-4 flex flex-col font-mono text-amber-50">
      <LazyQuester :id="data.hostId" />

      <i class="text-2xl font-extrabold mt-2">{{ data.title }}</i>
      <p class="text-sm">{{ data.description }}</p>

      <div class="bg-light-purple rounded-3xl p-4 my-4">
        <div class="flex items-center">
          <UIcon name="material-symbols:map-pin-heart-rounded" class="mr-1" />
          <p>{{ data.location }}</p>
        </div>

        <div class="lowercase">
          <p class="text-sm text-quest font-bold">
            <LazyNuxtTime
              :datetime="data.startTime"
              numeric="auto"
              relative
              relative-style="long"
            />
          </p>

          <p>
            starts:
            <LazyNuxtTime
              :datetime="data.startTime"
              month="short"
              day="numeric"
              weekday="short"
              hour="2-digit"
              minute="2-digit"
            />
          </p>
          <p>
            ends:
            <LazyNuxtTime
              :datetime="data.endTime"
              month="short"
              day="numeric"
              weekday="short"
              hour="2-digit"
              minute="2-digit"
            />
          </p>
        </div>
      </div>

      <Questers :questId="data.id" />

      <div class="flex gap-2">
        <UButton
          icon="material-symbols:share"
          color="secondary"
          size="md"
          variant="subtle"
          @click="copyLink"
        />

        <UButton
          icon="material-symbols:send-rounded"
          color="secondary"
          size="md"
          variant="subtle"
        />
      </div>
    </div>

    <CommentsPreview :questId="props.data.id" />
  </div>
</template>

<style scoped>
.questPost {
  background: #7a1768;
  background: linear-gradient(
    -180deg,
    rgba(122, 23, 104, 1) 0%,
    rgba(3, 89, 102, 1) 100%
  );
}
</style>
