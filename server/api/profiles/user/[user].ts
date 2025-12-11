import { profiles } from "~~/server/database/migrations/schema";
import { z } from "zod";
import { handleParseSchema } from "~~/server/utils/utils";

export default defineEventHandler(async (event) => {
  const userSchema = z.object({
    user: z.string(),
  });

  const user = handleParseSchema(userSchema, {
    user: event.context.params?.user,
  }).user as string;

  return (await db.query.profiles.findFirst({
    where: eq(profiles.username, user),
    with: {
      quests: true,
    },
  })) as Profile;
});
