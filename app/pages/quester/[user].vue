<script setup lang="ts">
definePageMeta({
  middleware: 'auth'
})

const user = useRoute().params.user

const profile = await getProfileFromUsername(user as string)

const questsHosted = await $fetch('/api/profiles/quests', {
  method: 'post',
  body: {id: profile.id}
})

</script>

<template>
  <div class="flex flex-col w-full p-4 font-scroll">
    <u class="text-7xl font-extrabold">{{ profile.username }}</u>

    <div class="border-l-4 border-amber-100 bg-green-800 opacity-70">
      {{profile.bio}}
    </div>

    <div class="text-3xl">
      <p>quests hosted: <u>{{ profile.questsHosted }}</u></p>
      <p>quests completed: <u>{{ profile.questsCompleted }}</u></p>
    </div>


    <div class="flex p-3 bg-quest opacity-80 rounded-full items-center w-fit">
      <UIcon name="solar:star-fall-bold" class="scale-125 mr-2"/>
      <i class="font-extrabold text-3xl">total magic:
        {{ (profile.questsHosted + profile.questsCompleted) || 0 }}</i>
    </div>

    <div class="text-4xl mt-6 font-extrabold">
      <div v-if="questsHosted.length > 0">
        <p>quests hosted!</p>
        <Quest v-for="quest in questsHosted" :data="quest"></Quest>
      </div>
      <p v-else class="text-red-400">no quests hosted yet :( </p>
    </div>
  </div>
</template>

<style scoped>

</style>