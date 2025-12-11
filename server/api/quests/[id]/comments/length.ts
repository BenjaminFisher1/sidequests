import { comments } from "~~/server/database/migrations/schema";
import { parseRouteId } from "~~/server/utils/utils";

//used to get the total number of comments
export default defineEventHandler(async (event) => {
  await requireUserSession(event);
  const questId = parseRouteId(event.context.params?.id);
  return db.$count(comments, eq(comments.questId, questId)) ?? 0;
});
