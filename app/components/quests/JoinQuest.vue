<script setup lang="ts">
const props = defineProps<{
  questID: string;
}>();

async function joinQuest() {
  questJoined.value = !questJoined.value;

  //if not liked, add the like
  if (questJoined.value) {
    await $fetch("/api/quests/join", {
      method: "post",
      body: { questId: props.questID },
    });

    await new Audio("/huzzah.mp3").play();

    useToast().add({
      title: "you have chosen to embark on this quest! huzzah!",
      // description: msg,
      icon: "pixel:people-carry-solid",
      color: "success",
    });

    text.value.style.color = "green";

    numQuesters.value++;
  } else {
    await $fetch("/api/quests/leave", {
      method: "post",
      body: { questId: props.questID },
    });

    numQuesters.value--;
    text.value.style.color = "white";
  }
}
</script>

<template></template>
