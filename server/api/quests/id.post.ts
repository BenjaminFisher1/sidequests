//gets quest with associated id

import { quests } from "~~/server/database/migrations/schema";

export default defineEventHandler<{
  body: { id: string };
}>(async (event) => {
  const body = await readBody(event);

  return (await db.query.quests.findFirst({
    where: eq(quests.id, body.id),
  })) as Quest;
});
