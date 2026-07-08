import postgres from "postgres";
import { drizzle } from "drizzle-orm/postgres-js";
import * as schema from "@/lib/db/schema";

const connectionString = process.env.POSTGRES_URL;
export const hasDatabase = Boolean(connectionString);
export const client = connectionString ? postgres(connectionString, { max: 1, prepare: false }) : null;
export const db = client ? drizzle(client, { schema }) : null;
