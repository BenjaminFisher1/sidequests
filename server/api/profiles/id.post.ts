import {profiles} from "~~/server/database/migrations/schema";

export default defineEventHandler<{ body: { id: string } }>(
    async (event) => {
        const body = await readBody(event) // Body is typed as { name: string }
        return db.select().from(profiles).where(eq(profiles.id, body.id)).limit(1)
    }
)