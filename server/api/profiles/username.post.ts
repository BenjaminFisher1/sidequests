import {getProfileFromUsername} from "~~/server/utils/utils";

export default defineEventHandler<{ body: { user: string } }>(
    async (event) => {
        const body = await readBody(event) // Body is typed as { name: string }
        return getProfileFromUsername(body.user);
    }
)