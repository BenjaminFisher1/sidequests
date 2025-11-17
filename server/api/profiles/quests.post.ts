import {quests} from "~~/server/database/migrations/schema";

//Used to query all quests posted by a specified user
export default defineEventHandler<{ body: { id: string } }>(
    async (event) => {
        const body = await readBody(event) // Body is typed as { name: string }
        return db.select().from(quests).where(eq(quests.hostId, body.id)).limit(1)
    }
)