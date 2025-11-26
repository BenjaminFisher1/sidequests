<script setup lang="ts">
const props = defineProps<{
  questId: string;
}>();

const questJoined = ref(false);
const numQuesters = ref(0);

//gets all questers
const { data: questers, refresh } = await useFetch("/api/quests/questers", {
  method: "post",
  body: { id: props.questId },

  //transform used to limit how much data is saved to payload. only what is necessary!
  transform: (questers) => {
    return questers.map((quester: Quester) => ({
      userId: quester.userId,
      joinedAt: quester.joinedAt,
    }));
  },
});

numQuesters.value = questers.value.length;

//check if the user has joined the quest!
const userJoined = await $fetch("/api/questers/joined", {
  method: "post",
  body: { questId: props.questId, userId: getUserId() },
});
questJoined.value = userJoined;

async function joinQuest() {
  questJoined.value = !questJoined.value;

  //if not liked, add the like
  if (questJoined.value) {
    await $fetch("/api/quests/join", {
      method: "post",
      body: { questId: props.questId },
    });

    await new Audio("/huzzah.mp3").play();

    useToast().add({
      title: "you have chosen to embark on this quest! huzzah!",
      // description: msg,
      icon: "pixel:people-carry-solid",
      color: "success",
    });

    numQuesters.value++;
  } else {
    await $fetch("/api/quests/leave", {
      method: "post",
      body: { questId: props.questId },
    });

    numQuesters.value--;
  }

  await refresh();
}
</script>

<template>
  <div class="flex flex-col">
    <div class="flex text-2xl font-scroll">
      <p class="">questers: {{ numQuesters }}</p>
    </div>

    <div class="grid grid-flow-row-dense">
      <Quester
        v-for="quester in questers"
        :key="quester.joinedAt"
        :id="quester.userId"
      />
    </div>

    <div
      id="join"
      @click="joinQuest"
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

      <!--      <p id="text" class="ml-2 mt-2">-->
      <!--        {{ numQuesters }}-->
      <!--      </p>-->
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
