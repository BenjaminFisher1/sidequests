//used to get all comments associated with a quest
import { comments } from "~~/server/database/migrations/schema";

export default defineEventHandler<{
  body: { questId: string };
}>(async (event) => {
  await requireUserSession(event);
  const body = await readBody(event);

  return (await db.query.comments.findMany({
    where: eq(comments.questId, body.questId),
  })) as Comment[];
});
