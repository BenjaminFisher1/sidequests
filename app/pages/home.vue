<script setup lang="ts">
import { createClient } from '@supabase/supabase-js'

// const config = useRuntimeConfig()
// const client = createClient(config.public.supabaseUrl, config.public.supabaseKey)
// const quests = ref([])

const test = useSupabaseClient()

const {data} = await test.from("quests").select()
console.log(data)

// async function getQuests() {
//   const { data } = await client.from('quests').select()
//   quests.value = data
//
//   console.log(data)
// }

// onMounted(() => {
//   getQuests()
// })
//
</script>

<template>
  <UHeader/>
<!--  <Quest :name="user"/>-->

</template>

<style scoped>

</style>