import { Pool } from "pg";
import { env } from "../../lib/env";

export const pool = new Pool({
  host: env.PGHOST,
  user: env.PGUSER,
  password: env.PGPASSWORD,
  database: env.PGDATABASE,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
  ssl: env.PGCA
    ? {
        ca: env.PGCA,
        rejectUnauthorized: true,
      }
    : false,
});
