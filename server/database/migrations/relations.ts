import { relations } from "drizzle-orm/relations";
import { profiles, comments, quests, questers, credentials } from "./schema";

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

export const profilesRelations = relations(profiles, ({many}) => ({
	comments: many(comments),
	questers: many(questers),
	credentials: many(credentials),
}));

export const questsRelations = relations(quests, ({many}) => ({
	comments: many(comments),
	questers: many(questers),
}));

export const questersRelations = relations(questers, ({one}) => ({
	profile: one(profiles, {
		fields: [questers.userId],
		references: [profiles.id]
	}),
	quest: one(quests, {
		fields: [questers.questId],
		references: [quests.id]
	}),
}));

export const credentialsRelations = relations(credentials, ({one}) => ({
	profile: one(profiles, {
		fields: [credentials.userId],
		references: [profiles.id]
	}),
}));