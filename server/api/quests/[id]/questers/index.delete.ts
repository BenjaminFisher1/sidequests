import { questers } from "~~/server/database/migrations/schema";
import { parseRouteId } from "~~/server/utils/utils";

export default defineEventHandler(async (event) => {
  const { user } = await requireUserSession(event);
  const questId = parseRouteId(event.context.params?.id);

  return db
    .delete(questers)
    .where(and(eq(questers.questId, questId), eq(questers.userId, user.id)));
});
