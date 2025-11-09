<script setup lang="ts">
const props = defineProps<{
  questID: string
}>()

const questJoined = ref(false)
const questers = ref(0)
const text = ref()

onMounted(async () => {
  await nextTick()

  // const {data} = await useSupabaseClient().from("questers").select().eq("quest_id", props.questID)
  const data = fetchRows("questers", "quest_id", props.questID)
  const questersLen = data?.length || 0
  questers.value = questersLen

  if (questersLen > 0) {
    for (const huzzah of data!) {
      if (huzzah.user_id == await getCurrentUserID())
        questJoined.value = true
    }
  }
})


async function joinQuest() {
  const client = useSupabaseClient()
  const userID = await getCurrentUserID()

  questJoined.value = !questJoined.value

  //if not liked, add the like
  if (questJoined.value) {
    await client.from("questers").insert({
      quest_id: props.questID,
      user_id: userID,
    })

    useToast().add({
      title: 'you have chosen to embark on this quest! huzzah!',
      // description: msg,
      icon: 'pixel:people-carry-solid',
      color: 'success',
    })

    text.value.style.color = 'green'

    questers.value++
  } else {
    await client.from("questers").delete().eq("user_id", userID)
    questers.value--
    text.value.style.color = 'white'
  }

}
</script>

<template>
  <div @click="joinQuest" class="max-h-10 flex">
    <img v-if="questJoined" src="~/assets/questtime.gif" alt="filled join quest"/>
    <img v-if="!questJoined" src="~/assets/questtime_hollow.gif" alt="hollow join quest"/>
    <p ref="text" class="ml-2 mt-2">{{ questers }}</p>
  </div>
</template>