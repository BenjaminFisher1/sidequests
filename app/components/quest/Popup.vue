<script setup lang="ts">
const props = defineProps<{
  joined: boolean;
}>();

const emit = defineEmits<{
  close: [boolean];
}>();

const title = props.joined
  ? "do you wish to Leave this quest?"
  : "do you wish to Embark on this quest?";

//true for joined or leaving, false for cancel
function click(joined: boolean) {
  emit("close", joined);
}
</script>

<template>
  <UModal class="font-scroll text-4xl h-50" :title="title" :close="false">
    <template #body>
      <div class="grid place-items-center grid-cols-2 gap-2">
        <UButton
          v-if="joined"
          icon="material-symbols:googler-travel"
          color="error"
          variant="subtle"
          size="xl"
          class="text-3xl"
          block
          @click="click(true)"
          >leave</UButton
        >
        <UButton
          v-else
          icon="material-symbols:person-play-rounded"
          color="primary"
          variant="subtle"
          size="xl"
          class="text-3xl"
          block
          @click="click(true)"
          >embark!</UButton
        >

        <UButton
          v-if="joined"
          icon="material-symbols:settings-accessibility-rounded"
          color="primary"
          variant="subtle"
          size="xl"
          class="text-3xl"
          block
          @click="click(false)"
          >stay</UButton
        >
        <UButton
          v-else
          icon="material-symbols:settings-accessibility-rounded"
          color="error"
          variant="subtle"
          size="xl"
          class="text-3xl"
          block
          @click="click(false)"
          >remain</UButton
        >
      </div>
    </template>
  </UModal>
</template>

<style scoped></style>
