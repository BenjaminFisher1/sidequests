import { z } from "zod";
import { credentials, profiles } from "~~/server/database/migrations/schema";

export default defineWebAuthnRegisterEventHandler({
  async storeChallenge(event, challenge, attemptId) {
    await useStorage().setItem(`auth:challenge:${attemptId}`, challenge, {
      ttl: 60,
    });
  },
  async getChallenge(event, attemptId) {
    const challenge = await useStorage().getItem<string>(
      `auth:challenge:${attemptId}`,
    );
    if (!challenge) {
      throw createError({
        statusCode: 400,
        statusMessage: "Challenge not found or expired",
      });
    }
    await useStorage().removeItem(`auth:challenge:${attemptId}`);
    return challenge;
  },

  validateUser: (user) =>
    z
      .object({
        userName: z.string().min(1).toLowerCase().trim(),
      })
      .parseAsync(user),

  async onSuccess(event, { user, credential }) {
    const dbUser = (
      await db
        .insert(profiles)
        .values({
          username: user.userName,
        })
        .returning()
        .catch(() => {
          throw createError({
            statusCode: 400,
            statusMessage: "User already exists",
          });
        })
    )[0] as Profile;

    await db.insert(credentials).values({
      userId: dbUser.id,
      id: credential.id,
      publicKey: credential.publicKey,
      counter: credential.counter,
      backedUp: credential.backedUp,
      transports: credential.transports,
    });

    await setUserSession(event, {
      user: {
        id: dbUser.id,
        username: dbUser.username,
      },
    });
  },

  async excludeCredentials(event, userName) {
    return db
      .select({
        id: credentials.id,
        transports: credentials.transports,
      })
      .from(profiles)
      .innerJoin(credentials, eq(credentials.userId, profiles.id))
      .where(eq(profiles.username, userName.toLowerCase().trim()));
  },
});
