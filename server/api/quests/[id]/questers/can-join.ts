import { canJoinQuest, parseRouteId } from "~~/server/utils/utils";

//Used to check if a user can join a given quest
export default defineEventHandler(async (event) => {
  const { user } = await requireUserSession(event);
  const questId = parseRouteId(event.context.params?.id);
  return canJoinQuest(user.id, questId).catch(() => false);
});
