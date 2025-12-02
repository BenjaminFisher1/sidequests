import { quests } from "~~/server/database/migrations/schema";

//Used to upload a quest!
export default defineEventHandler<{ body: { data: Object } }>(async (event) => {
  const { user } = await requireUserSession(event);
  const body = await readBody(event);
  const result = FormSchema.safeParse(body.data);

  //if data parsing unsuccessful
  if (result.error)
    throw createError({ statusCode: 400, statusMessage: result.error.message });

  return db
    .insert(quests)
    .values({
      hostId: user.id,
      title: result.data.title,
      description: result.data.description,
      startTime: result.data.startTime,
      endTime: result.data.endTime,
      location: result.data.location,
    })
    .onConflictDoNothing();
});
