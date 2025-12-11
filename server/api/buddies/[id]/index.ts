import { buddies } from "~~/server/database/migrations/schema";
import { parseRouteId } from "~~/server/utils/utils";
import { BuddyStatus } from "#shared/utils/schemas";

export default defineEventHandler(async (event) => {
  const { user } = await requireUserSession(event);
  const buddyId = parseRouteId(event.context.params?.id);

  const profile = await db.query.buddies.findFirst({
    where: and(
      eq(buddies.senderUserId, user.id),
      eq(buddies.receiverUserId, buddyId),
    ),
  });
});
