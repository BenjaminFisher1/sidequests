import { questers } from "~~/server/database/migrations/schema";
import { canJoinQuest } from "~~/server/utils/utils";

//Used to query all questers in a given quest
export default defineEventHandler<{
  body: { questId: string };
}>(async (event) => {
  const { user } = await requireUserSession(event);
  const body = await readBody(event);

  //will throw error if user cannot join a quest
  await canJoinQuest(user.id, body.questId);

  return db
    .insert(questers)
    .values({
      questId: body.questId,
      userId: user.id,
    })
    .onConflictDoNothing();
});
