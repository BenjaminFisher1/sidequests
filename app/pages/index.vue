<script setup lang="ts">
import { gsap } from "gsap";

onMounted(async () => {
  // Wait for the next DOM update cycle
  await nextTick()
  gsap.timeline()
      .set("#logo", {opacity: 1})
      .from("#logo", {scale: 0, duration: 2, rotationX: 180, rotationY: 360 })
})
</script>

<template>
  <div class="p-6">
    <p class="font-sans text-8xl">welcome to</p>
    <img id="logo" class="opacity-0" src="~/assets/sidequests.gif" alt="sidequests logo">
  </div>
</template>

<style scoped>
</style>