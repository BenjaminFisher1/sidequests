import { quests } from "~~/server/database/migrations/schema";

//used to check if a user can join a quest!
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
      endTime: true,
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

  //if quest is over
  if (Date.now() > Date.parse(quest.endTime))
    throw createError({
      statusCode: 400,
      statusMessage: "Quest is over!",
    });

  return true;
}
