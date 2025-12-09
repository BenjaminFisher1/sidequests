import { buddies } from "~~/server/database/migrations/schema";

//Removes a buddy and/or declines a buddy request
export default defineEventHandler<{ body: { buddyId: string } }>(
  async (event) => {
    const { user } = await requireUserSession(event);
    const body = await readBody(event);

    return db.delete(buddies).where(
      and(
        or(
          eq(buddies.senderUserId, user.id),
          eq(buddies.receiverUserId, user.id),
        ),

        or(
          eq(buddies.senderUserId, body.buddyId),
          eq(buddies.receiverUserId, body.buddyId),
        ),
      ),
    );
  },
);
