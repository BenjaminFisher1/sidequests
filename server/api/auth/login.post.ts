import {profiles} from "~~/server/database/migrations/schema";
import {getProfileFromUsername} from "~~/server/utils/utils";

export default defineEventHandler<{ body: { username: string, password: string } }>(async (event) => {
    const session = await getUserSession(event)

    // get email, password, name from the post body
    // for a more robust solution you could use zod to validate the body
    const body = await readBody(event);

    const profile = (await getProfileFromUsername(body.username))[0] as Profile

    // NOTE: You could also include email verification by
    // 1. generating a token and storing the token in KV storage
    // 2. sending the token to the user's email address
    // 3. checking the token sent to the user's email address against the token in KV storage

    // finally set the userSession cookie with the new user data
    // so that the user is logged in after registration
    // I hate it when apps don't log you in after registration! ?
    return await replaceUserSession(event, {
        // User data
        user: {
            id: profile.id,
            username: profile.username
        },
        // Any extra fields for the session data
        loggedInAt: new Date()
    })
});