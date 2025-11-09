<script setup lang="ts">
//code template from https://github.com/nuxt-modules/supabase/blob/main/demo/pages/login.vue
import type {FormSubmitEvent} from "#ui/types";
import type {AuthFormField} from '@nuxt/ui'

const supabase = useSupabaseClient()
const user = useSupabaseUser()
const toast = useToast()

const sign = ref<'in' | 'up'>('in')

watchEffect(() => {
  if (user.value) {
    return navigateTo('/')
  }
})

const usernameField: AuthFormField = {
  name: 'username',
  type: 'text',
  label: 'username',
  placeholder: 'what is your questing name?',
  required: true
}

const defaultFields: AuthFormField[] = [
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

const fields = ref<AuthFormField[]>(defaultFields)

function changeOption() {
  sign.value = sign.value === 'up' ? 'in' : 'up'
  if (sign.value == 'up') {
    const arr: AuthFormField[] = []
    arr.push(usernameField)
    arr.push(defaultFields[0]!)
    arr.push(defaultFields[1]!)

    fields.value = arr
  } else fields.value = defaultFields
}

const signIn = async (email: string, password: string) => {
  const {error} = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) displayError(error)
}

const signUp = async (username: string, email: string, password: string) => {
  const {error} = await supabase.auth.signUp({
    email,
    password,
  })
  if (error) displayError(error)
  else {
    toast.add({
      title: 'Sign up successful',
      icon: 'i-lucide-check-circle',
      color: 'success',
    })

    signIn(email, password).then(async () => {
      const userID = await getCurrentUserID()
      await supabase.from('profiles').insert({id: userID, username: username})
    })
  }
}

async function onSubmit(payload: FormSubmitEvent<any>) {
  const email = payload.data.email
  const password = payload.data.password
  const username = payload.data.username

  if (sign.value === 'in') await signIn(email, password)
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
              @click="changeOption()">
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