import { questers } from "~~/server/database/migrations/schema";

//Used to query all questers in a given quest
export default defineEventHandler<{
  body: { questId: string };
}>(async (event) => {
  const { user } = await requireUserSession(event);
  const body = await readBody(event);

  return db
    .insert(questers)
    .values({
      questId: body.questId,
      userId: user.id,
    })
    .onConflictDoNothing();
});
