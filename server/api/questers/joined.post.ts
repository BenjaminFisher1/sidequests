//Used to see if a user has joined a quest
import { questers } from "~~/server/database/migrations/schema";

export default defineEventHandler<{
  body: { questId: string; userId: string };
}>(async (event) => {
  const body = await readBody(event); // Body is typed as { name: string }

  const count =
    (await db.$count(
      questers,
      and(eq(questers.questId, body.questId), eq(questers.userId, body.userId)),
    )) ?? 0;

  return count > 0;
});
