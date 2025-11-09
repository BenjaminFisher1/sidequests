<script setup lang="ts">
import { gsap } from "gsap";
import type { Database, Tables, Enums } from "~/types/database.types";


onMounted(async () => {
  // Wait for the next DOM update cycle
  await nextTick()
  gsap.timeline()
      .set("#logo", {opacity: 1})
      .from("#logo", {scale: 0, duration: 2, rotationX: 180, rotationY: 360 })
})

const exampleQuests: Tables<"quests">[] = [{title: "come to my birthday party!", description: "hello! i'm having a super cool public birthday at the park! you should come :)"  }]

const route = useSupabaseSession().value ? '/home' : '/index'
</script>

<template>
  <div class="p-6 flex flex-col items-center text-center">
    <p class="font-sans text-4xl font-extrabold">welcome to</p>
    <img id="logo" class="opacity-0" src="~/assets/sidequests.gif" alt="sidequests logo">
    <p class="font-extrabold text-2xl mt-4 ">a new magical adventure in the domain of your very own community! </p>

    <NuxtLink :to="route" class="my-6">
      <img src="~/assets/startquesting.gif" alt="start questing!" />
    </NuxtLink>


    <p class="text-5xl text-green-500">bored?<br> go on a <u>sidequest!</u></p>
  </div>
</template>

<style scoped>
</style>