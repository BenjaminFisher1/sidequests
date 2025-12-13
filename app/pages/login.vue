<script setup lang="ts">
import type { FormSubmitEvent } from "#ui/types";
import type { AuthFormField } from "@nuxt/ui";

definePageMeta({
  layout: false,
});

const { loggedIn, user, session, clear, openInPopup } = useUserSession();
const { register, authenticate } = useWebAuthn({
  registerEndpoint: "/api/webauthn/register", // Default
  authenticateEndpoint: "/api/webauthn/authenticate", // Default
});

const toast = useToast();
const sign = ref<"in" | "up">("in");
const router = useRouter();

onMounted(() => {
  //Max cookie age is 30 days (represented in seconds)
  const visited = useCookie('visited', { maxAge: 60 * 60 * 24 * 30 });
  
  //if cookie "visited" does not exist, set it and switch to sign up :)

  if (!visited.value) {
    visited.value = 'true';
    sign.value = 'up';
  } else {                  //otherwise (visited before) default to sign in (huzzah)
    sign.value = 'in';
  }
});

watchEffect(() => {
  if (loggedIn.value) {
    return navigateTo("/home");
  }
});

const { fetch: fetchUserSession } = useUserSession();

const authFields: AuthFormField[] = [
  {
    name: "username",
    type: "text",
    label: "username",
    placeholder: "what is your questing name?",
    required: true,
  },
];

const fields = ref<AuthFormField[]>(authFields);

async function signIn(username: string) {
  try {
    await authenticate(username).then(fetchUserSession);
    navigateTo("/home");
  } catch (error) {
    displayError(error);
  }
}

async function signUp(username: string) {
  try {
    await register({ userName: username }).then(fetchUserSession); // refetch the user session

    toast.add({
      title: "Sign up successful",
      icon: "i-lucide-check-circle",
      color: "success",
    });
  } catch (error) {
    displayError(error);
  }
}

async function onSubmit(payload: FormSubmitEvent<any>) {
  const username = payload.data.username;

  if (sign.value === "in") await signIn(username);
  else await signUp(username);
}

const displayError = (error: AuthError) => {
  toast.add({
    title: "Error",
    description: error.message,
    icon: "i-lucide-alert-circle",
    color: "error",
  });
};
</script>

<template>
  <UContainer
    class="h-[calc(100vh-var(--ui-header-height))] flex items-center justify-center px-4"
  >
    <UPageCard class="max-w-sm w-full">
      <UAuthForm
        :title="sign === 'in' ? 'Login' : 'Sign up'"
        icon="i-lucide-user"
        :fields="fields"
        @submit="onSubmit"
        :submit="{ label: 'start questing!' }"
      >
        <template #description>
          {{
            sign === "up"
              ? "Already have an account?"
              : "Don't have an account?"
          }}
          <UButton
            variant="link"
            class="p-0"
            @click="sign = sign === 'up' ? 'in' : 'up'"
          >
            {{ sign === "in" ? "Sign up" : "Sign in" }}
          </UButton>
          .
        </template>
      </UAuthForm>
    </UPageCard>
  </UContainer>
</template>
<style scoped></style>
