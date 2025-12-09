<script setup lang="ts">
import QuesterUser from "~/pages/quester/[user].vue";

definePageMeta({
  middleware: "auth",
});

const { user } = useUserSession();
</script>

<template>
  <div>
    <QuesterUser :username="user?.username"></QuesterUser>
  </div>
</template>

<style scoped></style>
