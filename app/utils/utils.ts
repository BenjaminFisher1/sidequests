import {bytesToHex, randomBytes} from "@noble/hashes/utils.js";
import {scryptAsync, type ScryptOpts} from '@noble/hashes/scrypt.js';


export async function getProfileFromID(id: string) {
    const data = await $fetch('/api/profiles/id', {
        method: 'post',
        body: {id: id},
    })

    if(!data)
        createError(`No profile found with id ${id}`);

    return data[0] as Profile
}

export async function getProfileFromUsername(username: string) {
    const data = await $fetch('/api/profiles/username', {
        method: 'post',
        body: {user: username},
    })

    if(!data)
        createError(`No profile found with username ${username}`);

    return data[0] as Profile
}


/**
 * Options used to generate Scrypt hashes
 */
const scryptOptions: ScryptOpts = {N: 2 ** 16, r: 8, p: 1, dkLen: 32}

const emailHex = (email: string) => {
    return bytesToHex(new TextEncoder().encode(email))
}

/**
 * Generates user's hashed password on the server. Uses the provided email as salt for the
 * @param email
 * @param password Plaintext password to hash
 */
export async function generateUserCredential(email: string, password: string): Promise<{ salt: string, hash: string }> {
    const salt = bytesToHex(randomBytes(16))
    const emailSalt = emailHex(email) + salt
    console.log("emailSalt", emailSalt)
    const scrypt = await scryptAsync(password, emailSalt, scryptOptions);
    return {salt: salt, hash: bytesToHex(scrypt)}
}

/**
 * Verifies a user's login credentials
 * @param email
 * @param password
 * @param salt Salt from the database
 * @param hash hashedPassword
 * @param userId
 */
export async function verifyUserCredential(email: string, password: string, salt: string, hash: string, userId?: string) {
    const emailSalt = emailHex(email) + salt
    const scrypt = bytesToHex(await scryptAsync(password, emailSalt, scryptOptions))
    return scrypt == hash
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
