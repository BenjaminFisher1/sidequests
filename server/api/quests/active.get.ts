import { eq } from "drizzle-orm";
import { db } from "~~/server/utils/drizzle";
import { quests } from "~~/server/database/migrations/schema";

export default defineEventHandler(async (event) => {
  // const { user } = await requireUserSession(event)
  return db.select().from(quests).where(eq(quests.isActive, true));
});
