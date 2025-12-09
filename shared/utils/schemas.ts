import * as z from "zod";
import * as schema from "~~/server/database/migrations/schema";

export const FormSchema = z.object({
  title: z.string("label thy quest!").min(8, "Must be at least 8 characters"),
  description: z
    .string("describe thy quest!")
    .min(8, "Must be at least 8 characters"),
  image: z.file().optional(),
  startTime: z.iso.datetime({ local: true, error: "enter a start date!" }),
  endTime: z.iso.datetime({ local: true, error: "enter an end date!" }),
  location: z.string("provide a location for thy quest!"),
});

export const CommentSchema = z.object({
  content: z
    .string()
    .min(1, "come on bruh")
    .max(500, "Comment must be less than 500 characters!"),
});

export enum BuddyStatus {
  NotBuddies,
  Buddies,
  Pending,
}

export type Quest = typeof schema.quests.$inferSelect;
export type Profile = typeof schema.profiles.$inferSelect;
export type Quester = typeof schema.questers.$inferSelect;
export type Comment = typeof schema.comments.$inferSelect;
export type Buddy = typeof schema.buddies.$inferSelect;
