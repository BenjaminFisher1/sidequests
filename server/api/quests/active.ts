import { desc, eq } from "drizzle-orm";
import { db } from "~~/server/utils/drizzle";
import { quests } from "~~/server/database/migrations/schema";

export default defineEventHandler<{
  query: { offset?: number; limit?: number };
}>(async (event) => {
  // await requireUserSession(event);
  const query = getQuery(event);

  const limit = query.limit ?? 10;
  const offset = query.offset ?? 0;

  return db
    .select()
    .from(quests)
    .where(eq(quests.isActive, true))
    .orderBy(desc(quests.startTime))
    .limit(limit)
    .offset(offset);
});
