import { comments } from "~~/server/database/migrations/schema";
import { parseRouteId } from "~~/server/utils/utils";
import { desc } from "drizzle-orm";

//used to get all comments associated with a quest
export default defineEventHandler<{
  query: { limit?: number; offset?: number };
}>(async (event) => {
  await requireUserSession(event);
  const questId = parseRouteId(event.context.params?.id);
  const query = getQuery(event);

  const limit = query?.limit ?? 20;
  const offset = query?.offset ?? 0;

  return (await db
    .select()
    .from(comments)
    .where(eq(comments.questId, questId))
    .orderBy(desc(comments.createdAt))
    .limit(limit)
    .offset(offset)) as Comment[];
});
