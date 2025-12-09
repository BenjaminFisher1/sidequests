//Used to see if a user has joined a quest
import { questers } from "~~/server/database/migrations/schema";
import { parseRouteId } from "~~/server/utils/utils";

export default defineEventHandler(async (event) => {
  const { user } = await requireUserSession(event);
  const questId = parseRouteId(event.context.params?.id);

  const count =
    (await db.$count(
      questers,
      and(eq(questers.questId, questId), eq(questers.userId, user.id)),
    )) ?? 0;

  return count > 0;
});
