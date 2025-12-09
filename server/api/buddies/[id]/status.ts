import { buddies } from "~~/server/database/migrations/schema";
import { parseRouteId } from "~~/server/utils/utils";
import { BuddyStatus } from "#shared/utils/schemas";

export default defineEventHandler(async (event): Promise<BuddyStatus> => {
  const { user } = await requireUserSession(event);
  const buddyId = parseRouteId(event.context.params?.id);

  const profile = await db.query.buddies.findFirst({
    where: and(
      eq(buddies.senderUserId, user.id),
      eq(buddies.receiverUserId, buddyId),
    ),
  });

  //if buddy entry does not exist
  if (!profile) return BuddyStatus.NotBuddies;
  //if buddy entry has been accepted
  if (profile?.acceptedAt) return BuddyStatus.Buddies;
  //if buddy request has not been accepted
  return BuddyStatus.Pending;
});
