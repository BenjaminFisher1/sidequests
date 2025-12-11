<script setup lang="ts">
import BuddyButton from "~/components/profile/BuddyButton.vue";
import Buddies from "~/components/profile/Buddies.vue";

const props = defineProps<{
  username?: string;
}>();

const { user, clear } = useUserSession();

const { data: profile, status } = await useLazyFetch(
  `/api/profiles/user/${props.username || useRoute().params.user}`,
);

//if user owns account
const ownAccount = computed(
  () => user.value?.username == profile.value?.username,
);

function logout() {
  clear();
  navigateTo("/login");
}
</script>

<template>
  <div>
    <NuxtLoadingIndicator v-if="status === 'pending'"></NuxtLoadingIndicator>

    <div v-else class="font-scroll">
      <UMarquee reverse :overlay="false" :ui="{ root: '[--gap:--spacing(0)]' }">
        <u class="text-7xl font-extrabold w-full">{{ profile!.username }}</u>
      </UMarquee>

      <UButton
        trailing-icon="material-symbols:exit-to-app-rounded"
        color="error"
        variant="subtle"
        size="md"
        class="absolute right-0 top-0 m-4"
        @click="logout"
        v-if="ownAccount"
        >logout</UButton
      >

      <div class="text-3xl">
        <p>
          quests hosted: <u>{{ profile!.questsHosted }}</u>
        </p>
        <p>
          quests completed: <u>{{ profile!.questsCompleted }}</u>
        </p>
      </div>

      <div class="flex p-3 bg-quest opacity-80 rounded-full items-center w-fit">
        <UIcon name="solar:star-fall-bold" class="scale-125 mr-2" />
        <i class="font-extrabold text-3xl"
          >total magic:
          {{ profile!.questsHosted + profile!.questsCompleted || 0 }}</i
        >
      </div>

      <BuddyButton
        :profileId="profile!.id"
        :username="profile!.username"
        v-if="!ownAccount"
      ></BuddyButton>

      <Buddies :profileId="profile!.id" :username="profile!.username" />

      <div
        class="border-l-4 border-amber-100 bg-green-800 opacity-70 rounded-3xl p-4 text-2xl my-6"
        v-if="profile!.bio"
      >
        {{ profile!.bio }}
      </div>

      <p class="text-4xl font-extrabold">quests hosted!</p>

      <div v-if="profile!.quests">
        <p
          v-if="profile!.quests.length === 0"
          class="text-4xl font-extrabold text-red-400"
        >
          no quests hosted yet :(
        </p>

        <div v-else class="font-mono">
          <LazyQuest
            v-for="quest in profile!.quests"
            :data="quest"
            hydrate-on-visible
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
