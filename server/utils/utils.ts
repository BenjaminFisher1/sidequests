import { quests } from "~~/server/database/migrations/schema";
import { z } from "zod";

/**
 * Used to verify if a user can join a given quest
 * @param userId current user's id
 * @param questId quest to join
 */
export async function canJoinQuest(userId: string, questId: string) {
  //check if quest hostId is the same as the userId
  //users should not be able to join their own quest lol
  const questHost = await db.query.quests.findFirst({
    columns: {
      hostId: true,
    },
    where: eq(quests.id, questId),
  });

  //if quest hoster is the user
  if (questHost?.hostId == userId)
    throw createError({
      statusCode: 400,
      statusMessage: "You cannot join a quest you have created!",
    });

  //query quest to check validity of join
  const quest = await db.query.quests.findFirst({
    columns: {
      startTime: true,
      isActive: true,
    },
    where: eq(quests.id, questId),
  });

  //if quest is not active
  if (!quest?.isActive)
    throw createError({
      statusCode: 400,
      statusMessage: "Quest is inactive!",
    });

  //if quest has started
  if (Date.now() > Date.parse(quest.startTime))
    throw createError({
      statusCode: 400,
      statusMessage: "Quest is over!",
    });

  return true;
}

/**
 * Safely parses data from a given schema and throws an error if parsing fails.
 * @param schema a zod schema
 * @param data data to parse
 */
export function handleParseSchema(schema: z.ZodObject, data?: Object) {
  const result = schema.safeParse(data);

  if (!result.success)
    throw createError({
      statusCode: 400,
      statusMessage: result.error.message,
    });

  return result.data;
}

export function parseRouteId(id?: string) {
  const idSchema = z.object({
    id: z.uuid(),
  });

  return handleParseSchema(idSchema, { id: id }).id as string;
}
