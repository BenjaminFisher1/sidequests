import { relations } from "drizzle-orm/relations";
import { profiles, credentials } from "./schema";

export const credentialsRelations = relations(credentials, ({one}) => ({
	profile: one(profiles, {
		fields: [credentials.userId],
		references: [profiles.id]
	}),
}));

export const profilesRelations = relations(profiles, ({many}) => ({
	credentials: many(credentials),
}));