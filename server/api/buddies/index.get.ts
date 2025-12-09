import { buddies } from "~~/server/database/migrations/schema";
import { isNotNull } from "drizzle-orm";

//Gets all buddies the user has
export default defineEventHandler(async (event) => {
  const { user } = await requireUserSession(event);

  const allBuddies = db
    .select({
      senderId: buddies.senderUserId,
      receiverId: buddies.receiverUserId,
    })
    .from(buddies)
    .where(
      or(
        and(eq(buddies.receiverUserId, user.id), isNotNull(buddies.acceptedAt)),
        and(eq(buddies.senderUserId, user.id), isNotNull(buddies.acceptedAt)),
      ),
    )
    .as("allBuddies");
  //
  // const receivers = db
  //   .select({ id: buddies.receiverUserId })
  //   .from(buddies)
  //   .where(and(eq(buddies.receiverUserId, user.id), isNotNull(buddies.acceptedAt)))
  //
  // const receivers = db
  //   .select({ id: allBuddies.receiverId })
  //   .from(allBuddies)
  //   .having(({ id }) => ne(id, user.id));
  //
  // //trying to get all senders that are not the current user
  // const senders = db
  //   .select({ id: allBuddies.senderId })
  //   .from(allBuddies)
  //   .having(({ id }) => ne(id, user.id));

  // return receivers.fullJoin(senders;
});
