<script setup lang="ts">
interface Button {
  to: string
  src: string
  alt: string
}

const {user} = useUserSession()

const username = user.value!.username!
const link = `/quester/${username}`

const buttons: Button[] = [
  {to: '/home', src: '/home_icon.gif', alt: 'home icon'},
  {to: '/makequest', src: '/new_post_icon.gif', alt: 'post icon'},
  {to: link, src: '/profile.gif', alt: 'profile icon'},
]
</script>

<template>
  <div class="fixed bottom-0 left-0 w-full p-2 justify-center">
    <div id="drawer" class="rounded-full bg-quest opacity-75 left-0 w-full h-28 p-4 grid grid-cols-4 items-center">
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
  object-fit: contain;
  max-width: 100%;
  height: 100%;
}
</style>