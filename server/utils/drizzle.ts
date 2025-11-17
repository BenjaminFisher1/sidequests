import {drizzle} from 'drizzle-orm/node-postgres';
import 'dotenv/config';

import * as schema from '../database/migrations/schema'

export {sql, eq, and, or} from 'drizzle-orm'

export const tables = schema

const config = useRuntimeConfig()
export const db = drizzle(config.databaseUrl)

export type Quest = typeof schema.quests.$inferSelect
export type Profile = typeof schema.profiles.$inferSelect
export type Quester = typeof schema.questers.$inferSelect
