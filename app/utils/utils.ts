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

export function formatDate(date: string) {
    const d = new Date(date);
    const months = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'];
    const days = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];
    const month = months[d.getMonth()];

    const hours = d.getHours()
    const ampm = hours < 12 ? 'am' : 'pm'
    const getHour = hours > 12 ? hours - 12 : hours
    const getMinutes = d.getMinutes() < 10 ? '0' + d.getMinutes() : d.getMinutes()
    const time = `${getHour}:${getMinutes}${ampm}`

    return `${time} ${days[d.getDay()]} ${month} ${d.getDate()}`;
}
