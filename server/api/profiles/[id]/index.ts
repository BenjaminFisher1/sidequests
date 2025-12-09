import { profiles } from "~~/server/database/migrations/schema";
import { parseRouteId } from "~~/server/utils/utils";

export default defineEventHandler(async (event) => {
  const profileId = parseRouteId(event.context.params?.id);

  return (await db.query.profiles.findFirst({
    where: eq(profiles.id, profileId),
  })) as Profile;
});
