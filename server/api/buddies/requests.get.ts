import { buddies } from "~~/server/database/migrations/schema";
import { isNull } from "drizzle-orm";
import type { Buddy } from "#shared/utils/schemas";

//Gets all unaccepted buddy requests sent to current user
export default defineEventHandler(async (event) => {
  const { user } = await requireUserSession(event);

  return (await db
    .select()
    .from(buddies)
    .where(
      and(eq(buddies.receiverUserId, user.id), isNull(buddies.acceptedAt)),
    )) as Buddy[];
});
