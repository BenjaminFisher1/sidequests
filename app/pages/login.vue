<script setup lang="ts">
import type {FormSubmitEvent} from "#ui/types";
import type {AuthFormField} from '@nuxt/ui'

const {loggedIn, user, session, fetch, clear, openInPopup} = useUserSession()

const toast = useToast()

const sign = ref<'in' | 'up'>('in')

watchEffect(() => {
  if (loggedIn.value) {
    return navigateTo('/home')
  }
})

const authFields: AuthFormField[] = [
  {
    name: 'username',
    type: 'text',
    label: 'username',
    placeholder: 'what is your questing name?',
    required: true
  },
  {
    name: 'email',
    type: 'email',
    label: 'email',
    placeholder: 'enter your email',
    required: true
  },
  {
    name: 'password',
    type: 'password',
    label: 'password',
    placeholder: 'enter your awesome password',
    required: true
  }]

const fields = ref<AuthFormField[]>(authFields)

const signIn = async (username: string, email: string, password: string) => {

  try {
    const profile = (await getProfileFromUsername(username))[0] as Profile

    if (await verifyUserCredential(email, password, profile.salt!, profile.password!)) {
      await $fetch('/api/auth/login', {
        method: 'post',
        body: {
          username: username,
          password: profile.password!,
        },
      })
    }

    navigateTo('/home')
  } catch (error) {
    displayError(error)
  }
}

const signUp = async (username: string, email: string, password: string) => {
  try {
    const cred = await generateUserCredential(email, password)
    console.log(cred)

    const profile = await $fetch('/api/auth/register', {
      method: 'post',
      body: {
        username: username,
        password: cred.hash,
        salt: cred.salt
      },
    })

    toast.add({
      title: 'Sign up successful',
      icon: 'i-lucide-check-circle',
      color: 'success',
    })

    await signIn(username, email, password)
  } catch (error) {
    displayError(error)
  }
}

async function onSubmit(payload: FormSubmitEvent<any>) {
  const email = payload.data.email
  const password = payload.data.password
  const username = payload.data.username

  if (sign.value === 'in') await signIn(username, email, password)
  else await signUp(username, email, password)
}

const displayError = (error: AuthError) => {
  toast.add({
    title: 'Error',
    description: error.message,
    icon: 'i-lucide-alert-circle',
    color: 'error',
  })
}
</script>

<template>
  <UContainer class="h-[calc(100vh-var(--ui-header-height))] flex items-center justify-center px-4">
    <UPageCard class="max-w-sm w-full">
      <UAuthForm
          :title="sign === 'in' ? 'Login' : 'Sign up'"
          icon="i-lucide-user"
          :fields="fields"
          @submit="onSubmit"
          :submit="{label: 'start questing!'}"
      >
        <template
            #description
        >
          {{ sign === 'up' ? 'Already have an account?' : 'Don\'t have an account?' }}
          <UButton
              variant="link"
              class="p-0"
              @click="sign = sign === 'up' ? 'in' : 'up'">
            {{ sign === 'in' ? 'Sign up' : 'Sign in' }}
          </UButton>
          .
        </template>
      </UAuthForm>
    </UPageCard>
  </UContainer>
</template>
<style scoped>

</style>