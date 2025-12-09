<script setup lang="ts">
import BuddyButton from "~/components/profile/BuddyButton.vue";
import Buddies from "~/components/profile/Buddies.vue";

const props = defineProps<{
  username?: string;
}>();

const { user, clear } = useUserSession();

const { data: profileData } = await useFetch(
  `/api/profiles/user/${props.username || useRoute().params.user}`,
);

const profile = profileData.value as Profile;

const { data: questsHosted } = await useFetch(
  `/api/profiles/${profile.id}/quests`,
);

//if user owns account
const ownAccount = ref(user.value!.username == profile.username);

function logout() {
  clear();
  navigateTo("/login");
}
</script>

<template>
  <div class="font-scroll">
    <div class="flex">
      <u class="text-7xl font-extrabold w-full">{{ profile.username }}</u>
      <UButton
        trailing-icon="material-symbols:exit-to-app-rounded"
        color="error"
        variant="subtle"
        size="md"
        class="h-1/2 self-center"
        @click="logout"
        v-if="ownAccount"
        >logout</UButton
      >
    </div>

    <div class="text-3xl">
      <p>
        quests hosted: <u>{{ profile.questsHosted }}</u>
      </p>
      <p>
        quests completed: <u>{{ profile.questsCompleted }}</u>
      </p>
    </div>

    <div class="flex p-3 bg-quest opacity-80 rounded-full items-center w-fit">
      <UIcon name="solar:star-fall-bold" class="scale-125 mr-2" />
      <i class="font-extrabold text-3xl"
        >total magic:
        {{ profile.questsHosted + profile.questsCompleted || 0 }}</i
      >
    </div>

    <BuddyButton
      :profileId="profile.id"
      :username="profile.username"
      v-if="!ownAccount"
    ></BuddyButton>

    <Buddies :profileId="profile.id" :username="profile.username" />

    <div
      class="border-l-4 border-amber-100 bg-green-800 opacity-70 rounded-3xl p-4 text-2xl my-6"
      v-if="profile.bio"
    >
      {{ profile.bio }}
    </div>

    <div class="text-4xl font-extrabold">
      <p v-if="questsHosted.length > 0">quests hosted!</p>
      <p v-else class="questText text-red-400">no quests hosted yet :(</p>
    </div>

    <div v-if="questsHosted.length > 0" class="font-mono">
      <LazyQuest v-for="quest in questsHosted" :data="quest" />
    </div>

    <!--    <NuxtErrorBoundary>-->
    <!--      &lt;!&ndash; You use the default slot to render your content &ndash;&gt;-->
    <!--      <template #error="{ error, clearError }">-->
    <!--        You can display the error locally here: {{ error }}-->
    <!--        <button @click="clearError">This will clear the error.</button>-->
    <!--      </template>-->
    <!--    </NuxtErrorBoundary>-->
  </div>
</template>

<style scoped lang="postcss">
.questText {
  @apply text-4xl;
  @apply mt-6;
  @apply font-extrabold;
}
</style>
