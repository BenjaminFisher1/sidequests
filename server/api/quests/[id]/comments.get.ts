import { comments } from "~~/server/database/migrations/schema";
import { parseRouteId } from "~~/server/utils/utils";

//used to get all comments associated with a quest
export default defineEventHandler(async (event) => {
  await requireUserSession(event);
  const questId = parseRouteId(event.context.params?.id);

  return (await db.query.comments.findMany({
    where: eq(comments.questId, questId),
  })) as Comment[];
});
