import { migrate } from "drizzle-orm/node-postgres/migrator";
import { db } from "~~/server/utils/drizzle";

export default defineNitroPlugin(async (nitroApp) => {
  const migrationsPath =
    process.env.NODE_ENV === "production"
      ? "./migrations"
      : "server/database/migrations";

  try {
    await migrate(db, { migrationsFolder: migrationsPath });
    console.log("Migration completed");
  } catch (error) {
    console.error("Migration failed:", error);
  }
});
