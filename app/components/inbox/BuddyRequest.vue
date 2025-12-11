<script setup lang="ts">
const props = defineProps<{
  sentAt: string;
  userId: string;
}>();

const emit = defineEmits(["update"]);

async function accept() {
  await useFetch("/api/buddies", {
    method: "patch",
    body: { buddyId: props.userId },
  })
    .then(async () => {
      await useFetch(`/api/profiles/${props.userId}`, {
        server: false,
        pick: ["username"],
      }).then((res) => {
        useToast().add({
          title: `you and ${res.data.value?.username} are now buddies! happy questing!`,
          icon: "streamline-pixel:social-rewards-rating-star-1",
        });
      });
    })
    .catch((error) => {
      toastError(error);
    });

  emit("update");
}

async function decline() {
  await useFetch("/api/buddies", {
    method: "delete",
    body: { buddyId: props.userId },
  })
    .then(async () => {
      await useFetch(`/api/profiles/${props.userId}`, {
        server: false,
        pick: ["username"],
      }).then((res) => {
        useToast().add({
          title: `declined buddy request from ${res.data.value?.username}. tragic!`,
          icon: "streamline-pixel:phone-actions-remove-2",
          color: "error",
        });
      });
    })
    .catch((error) => {
      toastError(error);
    });

  emit("update");
}
</script>

<template>
  <div
    class="gradient p-4 rounded-4xl flex items-center opacity-80 border-double border-4 border-lime-800"
  >
    <img src="~/assets/buddy.gif" alt="buddy request" />

    <div class="flex flex-col justify-center">
      <p class="font-extrabold text-xl">new buddy request!</p>

      <LazyQuester :id="userId" />

      <div class="grid grid-cols-2 gap-2 mb-2 px-2">
        <UButton
          icon="pixelarticons:mood-sad"
          color="error"
          size="xl"
          class="font-bold shadow-xl"
          block
          @click="decline"
          >decline</UButton
        >
        <UButton
          icon="pixelarticons:human-handsup"
          color="primary"
          size="xl"
          class="font-bold shadow-xl"
          block
          @click="accept"
          >accept!</UButton
        >
      </div>

      <LazyNuxtTime
        :datetime="sentAt"
        numeric="auto"
        relative
        relative-style="short"
        class="text-xs"
      />
    </div>
  </div>
</template>

<style scoped>
.gradient {
  background: linear-gradient(301deg, #22ac13, #9bac13, #13aca6);
  background-size: 600% 600%;

  animation: gradient 10s ease infinite;
}

@keyframes gradient {
  0% {
    background-position: 0 0;
  }
  50% {
    background-position: 93% 100%;
  }
  100% {
    background-position: 0 0;
  }
}
</style>
