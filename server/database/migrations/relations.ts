import { relations } from "drizzle-orm/relations";
import { quests, questers, profiles, comments, credentials } from "./schema";

export const questersRelations = relations(questers, ({one}) => ({
	quest: one(quests, {
		fields: [questers.questId],
		references: [quests.id]
	}),
	profile: one(profiles, {
		fields: [questers.userId],
		references: [profiles.id]
	}),
}));

export const questsRelations = relations(quests, ({many}) => ({
	questers: many(questers),
	comments: many(comments),
}));

export const profilesRelations = relations(profiles, ({many}) => ({
	questers: many(questers),
	comments: many(comments),
	credentials: many(credentials),
}));

export const commentsRelations = relations(comments, ({one}) => ({
	profile: one(profiles, {
		fields: [comments.userId],
		references: [profiles.id]
	}),
	quest: one(quests, {
		fields: [comments.questId],
		references: [quests.id]
	}),
}));

export const credentialsRelations = relations(credentials, ({one}) => ({
	profile: one(profiles, {
		fields: [credentials.userId],
		references: [profiles.id]
	}),
}));