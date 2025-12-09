import { buddies } from "~~/server/database/migrations/schema";

//Accepts a buddy request from a specified user
export default defineEventHandler<{ body: { buddyId: string } }>(
  async (event) => {
    const { user } = await requireUserSession(event);
    const body = await readBody(event);

    return db
      .update(buddies)
      .set({ acceptedAt: new Date().toISOString() })
      .where(
        and(
          eq(buddies.receiverUserId, user.id),
          eq(buddies.senderUserId, body.buddyId),
        ),
      );
  },
);
