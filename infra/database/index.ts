import "dotenv/config";
import { drizzle } from "drizzle-orm/node-postgres";
import * as schema from "@/infra/database/schema";
import { Pool } from "pg";
import { env, isDev, isTest } from "@/lib/env";

export const pool = new Pool({
  host: env.POSTGRES_HOST,
  port: env.POSTGRES_PORT,
  user: env.POSTGRES_USER,
  password: env.POSTGRES_PASSWORD,
  database: env.POSTGRES_DB,
  ssl: (isDev || isTest) ? false : true,
  options: `-c search_path=${env.POSTGRES_SCHEMA}`
});

export const db = drizzle(pool, { schema });
