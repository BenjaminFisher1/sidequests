import {profiles} from "~~/server/database/migrations/schema";

export default defineEventHandler<{ body: { username: string, password: string, salt: string } }>(async (event) => {
    // Clear the current user session just in case
    await clearUserSession(event);

    // get email, password, name from the post body
    // for a more robust solution you could use zod to validate the body
    const body = await readBody(event);


    // check if email already exists in storage
    // and return an error if it does
    const existingUser = await db.select({username: profiles.username}).from(profiles).where(eq(profiles.username, body.username)).limit(1)

    if (existingUser[0]) {
        return createError({
            statusCode: 400,
            statusMessage: `User with username ${body.username} already exists`,
        });
    }

    // if the user doesn't exist, create a new user object
    // You could also include some other user data here like a profile picture, bio, etc. based on your registration form
    const newProfileData = await db.insert(profiles).values({
        username: body.username,
        password: body.password,
        salt: body.salt,
    }).returning()

    const newProfile = newProfileData[0] as Profile

    // and store it in KV storage
    // along with the hashed password
    // await storage.setItem(email, {
    //     ...user,
    //     // make sure to hash the password with Nuxt Auth Utils's built-in function
    //     // never store plain text passwords!
    //     password: await hashPassword(password),
    // });


    // NOTE: You could also include email verification by
    // 1. generating a token and storing the token in KV storage
    // 2. sending the token to the user's email address
    // 3. checking the token sent to the user's email address against the token in KV storage

    // finally set the userSession cookie with the new user data
    // so that the user is logged in after registration
    // I hate it when apps don't log you in after registration! ?
    return await setUserSession(event, {
        // User data
        user: {
            id: newProfile.id,
            username: newProfile.username
        },
        // Any extra fields for the session data
        loggedInAt: new Date()
    })});