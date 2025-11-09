<script setup lang="ts">
interface Button {
  to: string
  src: string
  alt: string
}

const username = await getUsernameFromID(await getCurrentUserID())
const link = '/' + username

const buttons: Button[] = [
  {to: '/home', src: '/home_icon.gif', alt: 'home icon'},
  {to: '/makequest', src: '/new_post_icon.gif', alt: 'post icon'},
  {to: link, src: '/profile.gif', alt: 'profile icon'},
]
</script>

<template>
  <div class="fixed bottom-0 left-0 w-full p-2 justify-center">
    <div id="drawer" class="rounded-full bg-quest opacity-75 left-0 w-full h-20 p-4 grid grid-cols-4 place-self-center">
      <div v-for="button in buttons">
        <NuxtLink :to="button.to">
          <NuxtImg :src="button.src" :alt="button.alt"/>
        </NuxtLink>
      </div>

    </div>
  </div>
</template>

<style scoped>
#drawer * {
  object-fit: cover;
  width: 100%;
  max-height: 100%;
}
</style>