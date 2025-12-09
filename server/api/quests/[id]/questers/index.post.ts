import { questers } from "~~/server/database/migrations/schema";
import { canJoinQuest, parseRouteId } from "~~/server/utils/utils";

//Used to query all questers in a given quest
export default defineEventHandler(async (event) => {
  const { user } = await requireUserSession(event);
  const questId = parseRouteId(event.context.params?.id);

  //will throw error if user cannot join a quest
  await canJoinQuest(user.id, questId);

  return db
    .insert(questers)
    .values({
      questId: questId,
      userId: user.id,
    })
    .onConflictDoNothing();
});
