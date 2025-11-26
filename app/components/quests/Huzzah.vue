<script setup lang="ts">
const props = defineProps<{
  questID: string;
}>();

const huzzahed = ref(false);
const huzzahs = ref(0);

onMounted(async () => {
  await nextTick();

  const { data } = await useSupabaseClient()
    .from("huzzahs")
    .select()
    .eq("quest_id", props.questID);
  const huzzLen = data?.length || 0;
  huzzahs.value = huzzLen;

  if (huzzLen > 0) {
    for (const huzzah of data!) {
      if (huzzah.user_id == (await getCurrentUserID())) huzzahed.value = true;
    }
  }
});

async function huzzah() {
  const client = useSupabaseClient();
  const userID = await getCurrentUserID();

  huzzahed.value = !huzzahed.value;

  //if not liked, add the like
  if (huzzahed.value) {
    await new Audio("/huzzah.mp3").play();
    await client.from("huzzahs").insert({
      quest_id: props.questID,
      user_id: userID,
    });

    useToast().add({
      title: "✰ HUZZAH!!! ✰",
      // description: msg,
      icon: "streamline-ultimate:ranking-stars-ribbon-bold",
      color: "success",
    });

    huzzahs.value++;
  } else {
    await client.from("huzzahs").delete().eq("user_id", userID);
    huzzahs.value--;
  }
}
</script>

<template>
  <div @click="huzzah" class="max-h-10 flex">
    <img
      v-if="huzzahed"
      src="../../assets/huzzah_filled.gif"
      alt="filled huzzah"
    />
    <img
      v-if="!huzzahed"
      src="../../assets/huzzah_hollow.gif"
      alt="hollow huzzah"
    />
    <p class="ml-2 mt-2">{{ huzzahs }}</p>
  </div>
</template>
