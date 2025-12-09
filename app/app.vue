<script setup lang="ts">
import { computed, ref } from "vue";
import { useRoute } from "#app";
import { DrawerButtons } from "~/utils/utils";

useHead({
  link: [
    {
      rel: "icon",
      type: "image/png",
      href: "/wizard.gif",
    },
  ],
});

// Swipe detection state
let startX = 0;
let startY = 0;
let deltaX = 0;
let deltaY = 0;
const THRESHOLD_PX = 10; // minimum horizontal move to count as a swipe
const MAX_VERTICAL_DRIFT = 30; // ignore diagonal drags

// Helper: find index of current route in the ordered list
const currentIndex = computed(() =>
  DrawerButtons.findIndex((p) => p.to === useRoute().path),
);

// Transition name (slide‑left or slide‑right)
const transitionDirection = ref<"left" | "right">("left");
const transitionName = computed(() =>
  transitionDirection.value === "left" ? "slide-left" : "slide-right",
);

// Touch handlers
function onTouchStart(e: TouchEvent) {
  const t = e.touches[0];
  startX = t!.clientX;
  startY = t!.clientY;
  deltaX = 0;
  deltaY = 0;
}

function onTouchMove(e: TouchEvent) {
  const t = e.touches[0];
  deltaX = t!.clientX - startX;
  deltaY = t!.clientY - startY;
}

function onTouchEnd() {
  // Ignore if vertical drift is too big – we only want pure horizontal swipes
  if (Math.abs(deltaY) > MAX_VERTICAL_DRIFT) return;

  if (deltaX > THRESHOLD_PX) {
    // Swipe right → go *back* (previous page)
    navigate(-1);
  } else if (deltaX < -THRESHOLD_PX) {
    // Swipe left → go *forward* (next page)
    navigate(+1);
  }
}

// Navigation helper
function navigate(step: number) {
  const targetIndex = currentIndex.value + step;
  if (targetIndex < 0 || targetIndex >= DrawerButtons.length) return; // no page in that direction

  // Set the correct slide direction for the animation
  transitionDirection.value = step > 0 ? "left" : "right";

  // Perform the route change
  navigateTo(DrawerButtons[targetIndex]!.to);
}
</script>

<template>
  <UApp>
    <UMain>
      <NuxtLayout>
        <div
          class="swipe-container"
          @touchstart="onTouchStart"
          @touchmove="onTouchMove"
          @touchend="onTouchEnd"
        >
          <NuxtPage
            :transition="{
              name: transitionName,
              mode: 'out-in',
            }"
            class="text-text overflow-x-hidden flex flex-col w-full h-svh p-4 overflow-y-scroll"
          />
        </div>
      </NuxtLayout>
    </UMain>
  </UApp>
</template>

<style scoped>
.swipe-container {
  width: 100svw;
  height: 100svh;
  overflow: hidden;
  position: relative;
}

.slide-left-enter-active,
.slide-left-leave-active,
.slide-right-enter-active,
.slide-right-leave-active {
  transition: transform 0.35s cubic-bezier(0.25, 0.8, 0.25, 1);
  will-change: transform;
}

/* entering from the right (next page) */
.slide-left-enter-from {
  transform: translateX(100%);
}
.slide-left-enter-to {
  transform: translateX(0);
}

/* leaving to the left (current page slides out) */
.slide-left-leave-from {
  transform: translateX(0);
}
.slide-left-leave-to {
  transform: translateX(-100%);
}

/* entering from the left (previous page) */
.slide-right-enter-from {
  transform: translateX(-100%);
}
.slide-right-enter-to {
  transform: translateX(0);
}

/* leaving to the right (current page slides out) */
.slide-right-leave-from {
  transform: translateX(0);
}
.slide-right-leave-to {
  transform: translateX(100%);
}
</style>
