import { quests } from "~~/server/database/migrations/schema";
import { parseRouteId } from "~~/server/utils/utils";

//Used to query all quests posted by a specified user
export default defineEventHandler(async (event) => {
  const profileId = parseRouteId(event.context.params?.id);

  return (await db.query.quests.findMany({
    where: eq(quests.hostId, profileId),
  })) as Quest[];
});
