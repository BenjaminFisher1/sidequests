import { canJoinQuest } from "~~/server/utils/utils";

//Used to check if a user can join a
export default defineEventHandler<{
  body: { questId: string };
}>(async (event) => {
  const { user } = await requireUserSession(event);
  const body = await readBody(event);

  return canJoinQuest(user.id, body.questId).catch(() => false);
});
