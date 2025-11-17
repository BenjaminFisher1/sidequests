export async function getProfileFromID(id: string) {
    const data = await $fetch('/api/profiles/id', {
        method: 'post',
        body: {id: id},
    })

    return data[0] as Profile
}

export function toastError(msg: string) {
    useToast().add({
        title: 'Error',
        description: msg,
        icon: 'i-lucide-alert-circle',
        color: 'error',
    })
}

export function formatDate(date: string) {
    const d = new Date(date)
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
