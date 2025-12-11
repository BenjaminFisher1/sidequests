<script setup lang="ts">
import BuddyRequest from "~/components/inbox/BuddyRequest.vue";

const { data: requests, refresh } = await useLazyFetch("/api/buddies/requests");
</script>

<template>
  <div class="">
    <p class="text-4xl font-extrabold">your Magical inbox...</p>

    <div>
      <BuddyRequest
        v-for="request in requests"
        :sent-at="request.sentAt"
        :user-id="request.senderUserId"
        @update="refresh"
      />
    </div>
  </div>
</template>

<style scoped></style>
