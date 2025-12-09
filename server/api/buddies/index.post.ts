import { buddies } from "~~/server/database/migrations/schema";

//Sends a buddy request to a given user
export default defineEventHandler<{ body: { buddyId: string } }>(
  async (event) => {
    const { user } = await requireUserSession(event);
    const body = await readBody(event);

    return db
      .insert(buddies)
      .values({
        senderUserId: user.id,
        receiverUserId: body.buddyId,
      })
      .onConflictDoNothing();
  },
);
