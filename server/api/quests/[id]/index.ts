import { quests } from "~~/server/database/migrations/schema";
import { parseRouteId } from "~~/server/utils/utils";

//gets quest with associated id
export default defineEventHandler(async (event) => {
  const questId = parseRouteId(event.context.params?.id);

  return (await db.query.quests.findFirst({
    where: eq(quests.id, questId),
  })) as Quest;
});
