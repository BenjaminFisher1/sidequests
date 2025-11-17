<script setup lang="ts">
definePageMeta({
  middleware: 'auth'
})
const {loggedIn, user, session, fetch, clear, openInPopup} = useUserSession()

const {pending, data: quests} = useFetch('/api/quests/active', {
  lazy: false,
})

// console.log("user", session.value)
</script>

<template>
  <div class="p-4 flex flex-col">
    <img class="w-60 mb-4" src="~/assets/sidequests.gif" alt="sidequests"/>
    <div class="flex flex-col gap-y-4 w-full">
      <NuxtLoadingIndicator v-if="pending"/>
      <LazyQuest v-for="quest in quests" v-else :data="quest"/>
    </div>

  </div>
<!--  <Drawer/>-->
</template>

<style scoped>

</style>