import { questers } from "~~/server/database/migrations/schema";

//Used to query all questers in a given quest
export default defineEventHandler<{ body: { id: string } }>(async (event) => {
  const body = await readBody(event);

  return (await db.query.questers.findMany({
    where: eq(questers.questId, body.id),
  })) as Quester[];
});
