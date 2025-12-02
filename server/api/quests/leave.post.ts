import { questers } from "~~/server/database/migrations/schema";

//Used to query all questers in a given quest
export default defineEventHandler<{
  body: { questId: string };
}>(async (event) => {
  const { user } = await requireUserSession(event);
  const body = await readBody(event);

  return db
    .delete(questers)
    .where(
      and(eq(questers.questId, body.questId), eq(questers.userId, user.id)),
    );
});
