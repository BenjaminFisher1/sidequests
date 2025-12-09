-- Current sql file was generated after introspecting the database
-- If you want to run this migration please uncomment this code before executing migrations

CREATE TABLE "profiles" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"username" varchar(64) NOT NULL,
	"bio" text,
	"quests_hosted" integer DEFAULT 0 NOT NULL,
	"quests_completed" integer DEFAULT 0 NOT NULL,
	"quests_joined" integer DEFAULT 0 NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "comments" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"quest_id" uuid NOT NULL,
	"content" varchar(500) NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "quests" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"host_id" uuid NOT NULL,
	"title" varchar(255) NOT NULL,
	"description" text NOT NULL,
	"location" varchar(255) NOT NULL,
	"is_active" boolean DEFAULT true NOT NULL,
	"start_time" timestamp with time zone NOT NULL,
	"end_time" timestamp with time zone NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "check_start_before_end" CHECK (start_time < end_time)
);
--> statement-breakpoint
CREATE TABLE "questers" (
	"quest_id" uuid NOT NULL,
	"user_id" uuid NOT NULL,
	"was_absent" boolean DEFAULT false NOT NULL,
	"joined_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "buddies" (
	"sender_user_id" uuid NOT NULL,
	"receiver_user_id" uuid NOT NULL,
	"sent_at" timestamp with time zone DEFAULT now() NOT NULL,
	"accepted_at" timestamp with time zone,
	CONSTRAINT "buddies_pk" PRIMARY KEY("sender_user_id","receiver_user_id"),
	CONSTRAINT "users_are_different" CHECK (sender_user_id IS DISTINCT FROM receiver_user_id)
);
--> statement-breakpoint
CREATE TABLE "credentials" (
	"user_id" uuid NOT NULL,
	"id" text NOT NULL,
	"public_key" text NOT NULL,
	"counter" integer NOT NULL,
	"backed_up" boolean NOT NULL,
	"transports" text[] NOT NULL,
	CONSTRAINT "credentials_pk" PRIMARY KEY("user_id","id")
);
--> statement-breakpoint
ALTER TABLE "comments" ADD CONSTRAINT "comments_profiles_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."profiles"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "comments" ADD CONSTRAINT "comments_quests_id_fk" FOREIGN KEY ("quest_id") REFERENCES "public"."quests"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "questers" ADD CONSTRAINT "questers_profiles_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."profiles"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "questers" ADD CONSTRAINT "questers_quests_id_fk" FOREIGN KEY ("quest_id") REFERENCES "public"."quests"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "credentials" ADD CONSTRAINT "credentials_profiles_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."profiles"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE UNIQUE INDEX "profiles_username_pk" ON "profiles" USING btree ("username" text_ops);