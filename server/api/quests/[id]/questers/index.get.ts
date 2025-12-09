import { questers } from "~~/server/database/migrations/schema";
import { parseRouteId } from "~~/server/utils/utils";

//Used to query all questers in a given quest
export default defineEventHandler(async (event) => {
  const questId = parseRouteId(event.context.params?.id);

  return (await db.query.questers.findMany({
    where: eq(questers.questId, questId),
  })) as Quester[];
});
