<script setup lang="ts">
const props = defineProps<{
  id: string;
  color?: string;
}>();

const { data: profile } = await useFetch(`/api/profiles/${props.id}`, {
  pick: ["username", "questsHosted", "questsCompleted"],
});

const questerLink = ref(`/quester/${profile.value?.username}`);
const magic = ref(0);
const icon = ref();

//if quester is current user
const { user } = useUserSession();
if (user.value!.id === props.id) {
  icon.value = "pixelarticons:user";
}

//set icon for buddy status
const { data: status } = await useFetch(`/api/buddies/${props.id}/status`);

if (status.value === BuddyStatus.Buddies)
  icon.value = "pixelarticons:mood-happy";
else if (status.value === BuddyStatus.SentPending)
  icon.value = "pixelarticons:mail-arrow-right";
else if (status.value === BuddyStatus.ReceivedPending)
  icon.value = "pixelarticons:user-plus";

//set magic!
magic.value = profile.value!.questsHosted + profile.value!.questsCompleted ?? 0;
</script>

<template>
  <div
    id="quester"
    class="bg-violet rounded-full flex p-3 size-fit items-center text-sm"
  >
    <UIcon :name="icon" v-if="icon" class="mr-1" />

    <u>
      <NuxtLink :to="questerLink" class="text-text">{{
        profile?.username
      }}</NuxtLink>
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
