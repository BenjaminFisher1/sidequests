export async function getUserDataFromID(id: string) {
    const {data} = await useSupabaseClient().from("profiles").select().eq("id", id).single()
    return data
}

export async function getUsernameFromID(id: string) {
   const data = await getUserDataFromID(id)
    return data?.username
}

export function toastError(msg: string) {
    useToast().add({
        title: 'Error',
        description: msg,
        icon: 'i-lucide-alert-circle',
        color: 'error',
    })
}

export async function getCurrentUserID() {
    const user = await useSupabaseClient().auth.getUser()
    return user.data.user!.id
}