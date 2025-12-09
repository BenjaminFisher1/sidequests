import { comments } from "~~/server/database/migrations/schema";
import { parseRouteId } from "~~/server/utils/utils";

//TODO add comment schema parsing
export default defineEventHandler<{
  body: { content: string };
}>(async (event) => {
  const { user } = await requireUserSession(event);
  const body = await readBody(event);

  // return CommentSchema.parse(body.content);

  // //if data parsing unsuccessful
  // if (result.error)
  //   throw createError({ statusCode: 400, statusMessage: result.error.message });

  const questId = parseRouteId(event.context.params?.id);

  return db.insert(comments).values({
    userId: user.id,
    questId: questId,
    content: body.content,
  });
});
