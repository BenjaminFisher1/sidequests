import { quests, questers } from "~~/server/database/migrations/schema";

//Used to query all questers in a given quest
export default defineEventHandler<{
  body: { questId: string };
}>(async (event) => {
  const { user } = await requireUserSession(event);
  const body = await readBody(event);

  //check if quest hostId is the same as the userId
  //users should not be able to join their own quests lol
  const questHost = await db.query.quests.findFirst({
    columns: {
      hostId: true,
    },
    where: eq(quests.id, body.questId),
  });

  if (questHost?.hostId == user.id)
    throw createError({
      statusCode: 400,
      statusMessage: "You cannot join a quest you have created!",
    });

  return db
    .insert(questers)
    .values({
      questId: body.questId,
      userId: user.id,
    })
    .onConflictDoNothing();
});
