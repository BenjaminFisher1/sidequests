<script setup lang="ts">
interface Button {
  to: string
  src: string
  alt: string
}

const buttons: Button[] = [
  {to: '/home', src: '/homeicon.gif', alt: 'home icon'},
  {to: '/makequest', src: '/posticon.gif', alt: 'post icon'}
]
</script>

<template>
  <div class="fixed bottom-0 left-0 w-full p-2 flex justify-center">
    <div class="rounded-full bg-quest opacity-75 left-0 w-full h-full p-4 grid grid-flow-col">
      <div v-for="button in buttons">
        <NuxtLink :to="button.to">
          <NuxtImg :src="button.src" :alt="button.alt"/>
        </NuxtLink>
      </div>

    </div>
  </div>
</template>

<style scoped>

</style>