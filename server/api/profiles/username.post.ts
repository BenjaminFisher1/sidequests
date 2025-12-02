import { profiles } from "~~/server/database/migrations/schema";

export default defineEventHandler<{ body: { user: string } }>(async (event) => {
  const body = await readBody(event); // Body is typed as { name: string }
  return (await db.query.profiles.findFirst({
    where: eq(profiles.username, body.user),
  })) as Profile;
});
