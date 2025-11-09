<script setup lang="ts">
const slug = useRoute().params.slug!
const client = useSupabaseClient()
const {data} = await client.from("profiles").select().eq("username", slug).single()

const allQuests = await client.from("quests").select().eq("host_id", data!.id)
</script>

<template>
  <div class="flex flex-col w-full p-4">
      <u class="text-7xl font-extrabold font-scroll">{{ data?.username }}</u>
      <p>college: suny new paltz</p>
      <p>quests hosted: {{ data?.quests_hosted }}</p>
      <p>quests completed: {{ data?.quests_completed }}</p>

    <div class="flex p-3 bg-quest opacity-80 rounded-full items-center w-fit">
      <UIcon name="solar:star-fall-bold" class="scale-125 mr-2"/>
      <i class="font-extrabold">total magic:
        {{ (data?.quests_hosted + data?.quests_completed) || 0 }}</i>
    </div>

    <div>
      <p class="text-4xl font-scroll mt-6 font-extrabold">quests hosted!</p>

      <div>

      </div>
      <Quest v-for="quest in allQuests.data" :data="quest"></Quest>
    </div>
  </div>
</template>

<style scoped>

</style>