import { credentials, profiles } from "~~/server/database/migrations/schema";

export default defineWebAuthnAuthenticateEventHandler({
  async storeChallenge(event, challenge, attemptId) {
    // Store the challenge in a KV store or DB
    await useStorage().setItem(`attempt:${attemptId}`, challenge);
  },

  async getChallenge(event, attemptId) {
    const challenge = await useStorage().getItem(`attempt:${attemptId}`);

    // Make sure to always remove the attempt because they are single use only!
    await useStorage().removeItem(`attempt:${attemptId}`);

    if (!challenge)
      throw createError({ statusCode: 400, message: "Challenge expired" });

    return challenge;
  },

  async allowCredentials(event, userName) {
    const user = await db.query.profiles.findFirst({
      where: eq(profiles.username, userName),
      with: {
        credentials: true,
      },
    });

    return user?.credentials || [];
  },

  async getCredential(event, credentialID) {
    const credential = await db.query.credentials.findFirst({
      where: eq(credentials.id, credentialID),
      with: {
        profile: true,
      },
    });

    if (!credential) {
      throw createError({
        statusCode: 404,
        statusMessage: "Credential not found",
      });
    }

    return credential;
  },

  async onSuccess(event, { credential }) {
    await setUserSession(event, {
      user: {
        id: credential.profile.id,
        username: credential.profile.username,
      },
    });
  },
});
