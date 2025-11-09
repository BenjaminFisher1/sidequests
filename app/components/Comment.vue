<script setup lang="ts">
import type {Database, Tables, Enums} from "~/types/database.types";

const props = defineProps<{
  data: Tables<'comments'>
}>()

const username = await getUsernameFromID(props.data.user_id)

console.log(props.data)
</script>

<template>
<div class="bg-amber-100 rounded-3xl p-3">
  <Quester :id="data.user_id" color="green" class="opacity-75"></Quester>
  <p class="my-2">{{props.data.content}}</p>
  <p class="text-xs">{{formatDate(data.created_at!)}}</p>

</div>
</template>

<style scoped>

</style>