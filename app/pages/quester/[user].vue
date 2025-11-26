<script setup lang="ts">
definePageMeta({
  middleware: "auth",
});

const user = useRoute().params.user;

const profile = await getProfileFromUsername(user!);

console.log(profile);

const { data: questsHosted } = await useFetch("/api/profiles/quests", {
  method: "post",
  body: { id: profile.id },
});
</script>

<template>
  <div class="flex flex-col w-full p-4 font-scroll">
    <u class="text-7xl font-extrabold">{{ profile.username }}</u>

    <div class="text-3xl">
      <p>
        quests hosted: <u>{{ profile.questsHosted }}</u>
      </p>
      <p>
        quests completed: <u>{{ profile.questsCompleted }}</u>
      </p>
    </div>

    <div class="flex p-3 bg-quest opacity-80 rounded-full items-center w-fit">
      <UIcon name="solar:star-fall-bold" class="scale-125 mr-2" />
      <i class="font-extrabold text-3xl"
        >total magic:
        {{ profile.questsHosted + profile.questsCompleted || 0 }}</i
      >
    </div>

    <div
      class="border-l-4 border-amber-100 bg-green-800 opacity-70 rounded-3xl p-4 text-2xl my-6"
    >
      {{ profile.bio }}
    </div>

    <div class="text-4xl font-extrabold">
      <p v-if="questsHosted.length > 0">quests hosted!</p>
      <p v-else class="questText text-red-400">no quests hosted yet :(</p>
    </div>

    <div v-if="questsHosted.length > 0">
      <LazyQuestsQuest
        v-for="quest in questsHosted"
        :data="quest"
      ></LazyQuestsQuest>
    </div>
  </div>
</template>

<style scoped lang="postcss">
.questText {
  @apply text-4xl;
  @apply mt-6;
  @apply font-extrabold;
}
</style>
