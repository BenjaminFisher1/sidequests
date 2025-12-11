import { buddies } from "~~/server/database/migrations/schema";
import { parseRouteId } from "~~/server/utils/utils";
import { BuddyStatus } from "#shared/utils/schemas";

export default defineEventHandler(async (event): Promise<BuddyStatus> => {
  const { user } = await requireUserSession(event);
  const buddyId = parseRouteId(event.context.params?.id);

  const profile = await db.query.buddies.findFirst({
    where: or(
      and(
        eq(buddies.senderUserId, user.id),
        eq(buddies.receiverUserId, buddyId),
      ),

      and(
        eq(buddies.senderUserId, buddyId),
        eq(buddies.receiverUserId, user.id),
      ),
    ),
  });

  //if buddy entry does not exist
  if (!profile) return BuddyStatus.NotBuddies;
  //if buddy entry has been accepted
  else if (profile.acceptedAt) return BuddyStatus.Buddies;
  //if user sent the request
  else if (profile.senderUserId === user.id) return BuddyStatus.SentPending;
  //otherwise, if user received the request
  else return BuddyStatus.ReceivedPending;
});
