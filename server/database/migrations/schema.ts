import { pgTable, uniqueIndex, uuid, varchar, text, integer, timestamp, check, boolean, foreignKey, primaryKey } from "drizzle-orm/pg-core"
import { sql } from "drizzle-orm"



export const profiles = pgTable("profiles", {
	id: uuid().defaultRandom().notNull(),
	username: varchar({ length: 64 }).notNull(),
	bio: text(),
	questsHosted: integer("quests_hosted").default(0).notNull(),
	questsCompleted: integer("quests_completed").default(0).notNull(),
	questsJoined: integer("quests_joined").default(0).notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
}, (table) => [
	uniqueIndex("profiles_username_pk").using("btree", table.username.asc().nullsLast().op("text_ops")),
]);

export const quests = pgTable("quests", {
	id: uuid().defaultRandom().notNull(),
	hostId: uuid("host_id").notNull(),
	title: varchar({ length: 255 }).notNull(),
	description: text().notNull(),
	location: varchar({ length: 255 }).notNull(),
	isActive: boolean("is_active").default(true).notNull(),
	startTime: timestamp("start_time", { mode: 'string' }).notNull(),
	endTime: timestamp("end_time", { mode: 'string' }).notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
}, (table) => [
	uniqueIndex("quests_pk").using("btree", table.id.asc().nullsLast().op("uuid_ops")),
	check("check_start_before_end", sql`start_time < end_time`),
]);

export const questers = pgTable("questers", {
	questId: uuid("quest_id").notNull(),
	userId: uuid("user_id").notNull(),
	wasAbsent: boolean("was_absent").default(false).notNull(),
	joinedAt: timestamp("joined_at", { mode: 'string' }).defaultNow().notNull(),
});

export const credentials = pgTable("credentials", {
	userId: uuid("user_id").notNull(),
	id: text().notNull(),
	publicKey: text("public_key").notNull(),
	counter: integer().notNull(),
	backedUp: boolean("backed_up").notNull(),
	transports: text().array().notNull(),
}, (table) => [
	foreignKey({
			columns: [table.userId],
			foreignColumns: [profiles.id],
			name: "credentials_profiles_id_fk"
		}).onDelete("cascade"),
	primaryKey({ columns: [table.userId, table.id], name: "credentials_pk"}),
]);
