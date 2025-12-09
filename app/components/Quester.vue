<script setup lang="ts">
const props = defineProps<{
  id: string;
  color?: string;
}>();

const quester = ref();
const questerLink = ref();
const magic = ref(0);

const { data: profile } = await useFetch(`/api/profiles/${props.id}`, {
  pick: ["username", "questsHosted", "questsCompleted"],
});

const username = profile.value?.username;
quester.value = username;
questerLink.value = `/quester/${username}`;

//set magic!
magic.value = profile.value?.questsHosted + profile.value?.questsCompleted ?? 0;
</script>

<template>
  <div
    id="quester"
    class="bg-violet rounded-full flex p-3 size-fit items-center text-sm"
  >
    <u>
      <NuxtLink :to="questerLink" class="text-text">{{ quester }}</NuxtLink>
    </u>

    <div class="ml-3 pl-2 flex items-center border-l-2 border-amber-50">
      <UIcon name="solar:star-fall-bold" class="scale-125" />
      <p class="font-extrabold">{{ magic }}</p>
    </div>
  </div>
</template>

<style scoped>
#quester {
  background-color: v-bind(color);
}
</style>
