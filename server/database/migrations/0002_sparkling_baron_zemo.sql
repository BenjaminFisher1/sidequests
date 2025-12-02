ALTER TABLE "profiles" ALTER COLUMN "questsHosted" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "profiles" ALTER COLUMN "questsCompleted" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "profiles" ALTER COLUMN "questsJoined" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "profiles" ALTER COLUMN "createdAt" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "questers" ALTER COLUMN "wasAbsent" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "questers" ALTER COLUMN "joinedAt" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "quests" ALTER COLUMN "isActive" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "quests" ALTER COLUMN "createdAt" SET NOT NULL;