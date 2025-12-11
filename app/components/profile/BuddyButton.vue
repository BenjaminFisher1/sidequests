<script setup lang="ts">
import { BuddyStatus } from "#shared/utils/schemas";
import type { ToastProps } from "@nuxt/ui/components/Toast.vue";

const props = defineProps<{
  profileId: string;
  username: string;
}>();

const open = ref(false);

const { data: status, refresh } = await useFetch(
  `/api/buddies/${props.profileId}/status`,
);

interface ButtonState {
  icon: string;
  color:
    | "error"
    | "primary"
    | "secondary"
    | "success"
    | "info"
    | "warning"
    | "neutral";
  text: string;
}

const buddyButtonStates: ButtonState[] = [
  { icon: "pixelarticons:user-plus", color: "primary", text: "add buddy!" },
  { icon: "pixelarticons:user-minus", color: "error", text: "remove buddy..." },
  {
    icon: "pixelarticons:mail-arrow-right",
    color: "secondary",
    text: "buddy request sent!",
  },
  {
    icon: "pixelarticons:message-processing",
    color: "warning",
    text: "accept buddy request?",
  },
];

const nayButtonStates: ButtonState[] = [
  { icon: "pixelarticons:mood-sad", color: "error", text: "nay..." },
  { icon: "pixelarticons:human-handsup", color: "primary", text: "nay!" },
  { icon: "pixelarticons:mood-happy", color: "primary", text: "nay!" },
  { icon: "pixelarticons:mood-sad", color: "error", text: "nay..." },
];

const yayButtonStates: ButtonState[] = [
  { icon: "pixelarticons:human-handsup", color: "primary", text: "yay!" },
  {
    icon: "pixelarticons:mood-sad",
    color: "error",
    text: "yay...",
  },
  { icon: "pixelarticons:mail-delete", color: "error", text: "yay" },
  { icon: "pixelarticons:human-handsup", color: "primary", text: "yay!" },
];

const buttonState = computed(() => buddyButtonStates[status.value]!);
const nayButtonState = computed(() => nayButtonStates[status.value]!);
const yayButtonState = computed(() => yayButtonStates[status.value]!);

async function yayAction() {
  switch (status.value as BuddyStatus) {
    case BuddyStatus.NotBuddies:
      await update("post", {
        title: "huzzah! buddy request sent!",
        icon: "streamline-pixel:social-rewards-rating-star-1",
      });
      break;

    case BuddyStatus.Buddies:
      await update("delete", {
        title: "buddy removed... devastating",
        icon: "streamline-pixel:hand-dislike",
        color: "error",
      });
      break;

    case BuddyStatus.SentPending:
      await update("delete", {
        title: "buddy request cancelled",
        icon: "streamline-pixel:romance-heart-lock",
        color: "warning",
      });
      break;

    case BuddyStatus.ReceivedPending:
      await update("patch", {
        title: "huzzah! buddy request accepted!",
        icon: "streamline-pixel:music-notes-music-2",
      });
      break;
  }

  async function update(
    method: "post" | "delete" | "patch",
    toast: ToastProps,
  ) {
    await $fetch("/api/buddies", {
      method: method,
      body: { buddyId: props.profileId },
    })
      .then(() => {
        useToast().add(toast);
      })
      .catch((error) => {
        toastError(error.message);
      });
  }

  open.value = !open.value;
  await refresh();
}
</script>

<template>
  <UPopover arrow :open="open">
    <UButton
      :icon="buttonState.icon"
      :color="buttonState.color"
      variant="subtle"
      size="xl"
      class="w-fit"
      @click="open = !open"
      >{{ buttonState.text }}</UButton
    >

    <template #content>
      <div class="h-full m-4 inline-flex flex-col items-center">
        <p v-if="status == BuddyStatus.NotBuddies">
          add <u class="font-bold">{{ username }}</u> as a buddy?
        </p>

        <p v-else-if="status == BuddyStatus.Buddies">
          remove <u class="font-bold">{{ username }}</u> as a buddy?
        </p>

        <p v-else-if="status == BuddyStatus.SentPending">
          cancel buddy request to <u class="font-bold">{{ username }}</u
          >?
        </p>

        <p v-else-if="status == BuddyStatus.ReceivedPending">
          accept buddy request from <u class="font-bold">{{ username }}</u
          >?
        </p>

        <div class="flex gap-3 mt-3 w-full">
          <UButton
            :icon="nayButtonState.icon"
            variant="subtle"
            :color="nayButtonState.color"
            size="xl"
            class="w-full"
            @click="open = false"
            >{{ nayButtonState.text }}</UButton
          >

          <UButton
            :icon="yayButtonState.icon"
            variant="subtle"
            :color="yayButtonState.color"
            size="xl"
            class="w-full"
            @click="yayAction"
            >{{ yayButtonState.text }}</UButton
          >
        </div>
      </div>
    </template>
  </UPopover>
</template>

<style scoped></style>
