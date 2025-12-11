<script setup lang="ts">
const props = defineProps<{
  buttons: DrawerButton[];
}>();
</script>

<template>
  <div class="fixed bottom-3 left-0 w-full z-50">
    <div
      class="rounded-full bg-quest opacity-75 m-auto left-0 w-5/6 h-20 p-2 grid grid-flow-col"
    >
      <NuxtLink v-for="button in buttons" :to="button.to">
        <img :src="button.src" :alt="button.alt" />
      </NuxtLink>
    </div>
  </div>
</template>

<style scoped>
a > img {
  width: 0;
  height: 0;
  min-height: 100%;
  min-width: 100%;
  object-fit: contain;
}

.router-link-active {
  transition: scale 0.25s ease-in-out;
  scale: 1.2;
  filter: drop-shadow(5px 5px 9px #ed3399);
}

.router-link-active::before {
  position: absolute;
  content: "★";
  font-size: 2rem;
  color: darkcyan;

  left: 50%;
  bottom: 0;
  transition: all 0.25s ease-in-out;
  transform: translate(-50%, 50%);
}
</style>
