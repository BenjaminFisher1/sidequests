import * as z from "zod";
import { quests } from "~~/server/database/migrations/schema";

const schema = z.object({
  title: z.string("label thy quest!").min(8, "Must be at least 8 characters"),
  description: z
    .string("describe thy quest!")
    .min(8, "Must be at least 8 characters"),
  image: z.file().optional(),
  startTime: z.iso.datetime({ local: true, error: "enter a start date!" }),
  endTime: z.iso.datetime({ local: true, error: "enter an end date!" }),
  location: z.string("provide a location for thy quest!"),
});

//Used to upload a quest!
export default defineEventHandler<{ body: { data: Object } }>(async (event) => {
  const { user } = await requireUserSession(event);
  const body = await readBody(event);
  const result = schema.safeParse(body.data);

  //if data parsing unsuccessful
  if (result.error)
    throw createError({ statusCode: 400, message: result.error.message });

  return db
    .insert(quests)
    .values({
      hostId: user.id,
      title: result.data.title,
      description: result.data.description,
      startTime: result.data.startTime,
      endTime: result.data.endTime,
      location: result.data.location,
    })
    .onConflictDoNothing();
});
