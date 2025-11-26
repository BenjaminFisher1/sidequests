import { profiles } from "~~/server/database/migrations/schema";

export async function getProfileFromUsername(username: string) {
  return (await db.query.profiles.findFirst({
    where: eq(profiles.username, username),
  })) as Profile;
}
