import {profiles} from "~~/server/database/migrations/schema";

export function getProfileFromUsername(username: string) {
    return db.select().from(profiles).where(eq(profiles.username, username)).limit(1)
}