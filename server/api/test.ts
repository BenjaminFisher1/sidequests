import {db} from "~~/server/utils/drizzle";
import {quests} from "~~/server/database/migrations/schema";
import {eq} from "drizzle-orm";

export default defineEventHandler(async (event) => {
    const {user} = await requireUserSession(event)
    return user
})