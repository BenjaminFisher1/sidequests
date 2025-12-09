<script setup lang="ts">
const props = defineProps<{
  questId: string;
}>();

const numQuesters = ref(0);

//see if user can join quest
const { data: canJoin } = await useFetch(
  `/api/quests/${props.questId}/questers/can-join`,
);

//gets all questers
const { data: questers, refresh } = await useFetch(
  `/api/quests/${props.questId}/questers`,
  {
    //transform used to limit how much data is saved to payload. only what is necessary!
    transform: (questers) => {
      return questers.map((quester: Quester) => ({
        userId: quester.userId,
        joinedAt: quester.joinedAt,
      }));
    },
  },
);

numQuesters.value = questers.value?.length ?? 0;

async function joinQuest() {
  numQuesters.value++;
  await refresh();
}

async function leaveQuest() {
  numQuesters.value--;
  await refresh();
}
</script>

<template>
  <div class="flex flex-col">
    <div class="flex text-2xl font-scroll">
      <p class="">questers: {{ numQuesters }}</p>
    </div>

    <div class="grid grid-flow-row-dense">
      <p
        v-if="numQuesters == 0 && canJoin"
        class="font-scroll font-extrabold text-yellow-500 text-3xl"
      >
        be the first to join!
      </p>
      <LazyQuester
        v-for="quester in questers"
        :key="quester.joinedAt"
        :id="quester.userId"
      />
    </div>

    <LazyQuestJoin
      :questId="questId"
      :canJoin="canJoin ?? false"
      @join="joinQuest"
      @leave="leaveQuest"
    />
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
