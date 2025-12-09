<script setup lang="ts">
import { QuestPopup } from "#components";

const props = defineProps<{
  questId: string;
  canJoin: boolean;
}>();

const emit = defineEmits(["join", "leave"]);
const questJoined = ref(false);

//check if the user has joined the quest!
const { data: userJoined } = await useFetch(
  `/api/quests/${props.questId}/questers/joined`,
);
questJoined.value = userJoined.value ?? questJoined.value;

async function openPopup() {
  const popup = useOverlay().create(QuestPopup);

  const instance = popup.open({
    joined: questJoined.value,
  });

  //true if joining or leaving, false if cancelled
  if (await instance.result) {
    //if already joined -> leaving
    if (questJoined.value) await leaveQuest();
    else await joinQuest();
  }
}

async function joinQuest() {
  await $fetch(`/api/quests/${props.questId}/questers`, {
    method: "post",
  })
    .then(async () => {
      questJoined.value = true;
      await new Audio("/huzzah.mp3").play();

      useToast().add({
        title: "you have chosen to embark on this quest! huzzah!",
        icon: "pixel:people-carry-solid",
        color: "success",
      });

      emit("join");
    })
    .catch((error) => {
      toastError(error.message);
    });
}

async function leaveQuest() {
  await $fetch(`/api/quests/${props.questId}/questers`, {
    method: "delete",
    body: { questId: props.questId },
  })
    .then(async () => {
      questJoined.value = false;
      emit("leave");
    })
    .catch((error) => {
      toastError(error.message);
    });
}
</script>

<template>
  <div class="flex flex-col">
    <!-- button for showing quest join status-->
    <div
      id="join"
      v-if="canJoin"
      @click="openPopup"
      class="bg-teal-950 rounded-full p-2 h-20 grid grid-cols-2 place-content-center text-center font-extrabold font-scroll text-3xl"
    >
      <img
        v-if="!questJoined"
        src="~/assets/questtime_hollow.gif"
        alt="hollow join quest"
      />
      <p v-if="!questJoined">join quest</p>

      <img
        v-if="questJoined"
        src="~/assets/questtime.gif"
        alt="filled join quest"
      />
      <p v-if="questJoined" class="text-emerald-300">questing awaits!</p>
    </div>
  </div>
</template>

<style scoped>
#join > img {
  width: 0;
  height: 0;
  min-height: 100%;
  min-width: 100%;
  object-fit: contain;
}
</style>
