<script setup lang="ts">
import type { Comment } from "~~/shared/utils/schemas";

const props = defineProps<{
  data: Comment;
  preview?: boolean;
}>();

const showOptions = ref(false);
</script>

<template>
  <div>
    <Quester :id="data.userId" class="opacity-75"></Quester>
    <div class="bg-cyan-700 rounded-2xl p-3 w-fit flex gap-2 items-center">
      <div class="flex flex-col">
        <p>{{ props.data.content }}</p>
        <LazyNuxtTime
          :datetime="data.createdAt"
          numeric="auto"
          relative
          relative-style="short"
          class="text-xs text-gray-300"
        />

        <Transition>
          <div v-if="showOptions" class="mt-2">
            <UButton
              icon="material-symbols:reply"
              size="md"
              variant="soft"
              color="neutral"
            />
          </div>
        </Transition>
      </div>

      <UCollapsible v-if="!preview">
        <UButton
          trailing-icon="material-symbols:arrow-drop-down-rounded"
          class="group"
          variant="ghost"
          color="neutral"
          size="xl"
          :ui="{
            trailingIcon:
              'group-data-[state=open]:rotate-180 transition-transform duration-200',
          }"
          block
          @click="showOptions = !showOptions"
        />
      </UCollapsible>
    </div>
  </div>
</template>

<style scoped>
.v-enter-from,
.v-leave-to {
  transform: scaleY(0);
}

.v-enter-active,
.v-leave-active {
  transition: all 0.25s ease-in-out;
}
</style>
