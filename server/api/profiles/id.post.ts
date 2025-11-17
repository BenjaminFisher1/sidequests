import {profiles} from "~~/server/database/migrations/schema";
import {createSelectSchema} from "drizzle-zod";

export default defineEventHandler<{ body: { id: string } }>(
    async (event) => {
        // const { user } = await requireUserSession(event)

        const query = getQuery(event) // Query is typed as { id: string }
        const body = await readBody(event) // Body is typed as { name: string }

        // const profileSchema = createSelectSchema(profiles)
        return db.select().from(profiles).where(eq(profiles.id, body.id)).limit(1)
    }
)