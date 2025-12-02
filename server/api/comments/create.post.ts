import { comments } from "~~/server/database/migrations/schema";

export default defineEventHandler<{
  body: { questId: string; content: string };
}>(async (event) => {
  const { user } = await requireUserSession(event);
  const body = await readBody(event);

  // return CommentSchema.parse(body.content);

  // //if data parsing unsuccessful
  // if (result.error)
  //   throw createError({ statusCode: 400, statusMessage: result.error.message });

  return db.insert(comments).values({
    userId: user.id,
    questId: body.questId,
    content: body.content,
  });
});
