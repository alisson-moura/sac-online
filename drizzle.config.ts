import { defineConfig } from "drizzle-kit";
import { env } from "@/lib/env";

export default defineConfig({
  schema: "./infra/database/schema",
  out: "./infra/database/migrations",
  dialect: "postgresql",
  dbCredentials: {
    host: env.POSTGRES_HOST,
    port: env.POSTGRES_PORT,
    user: env.POSTGRES_USER,
    password: env.POSTGRES_PASSWORD,
    database: env.POSTGRES_DB,
    ssl: env.POSTGRES_CA
      ? {
          rejectUnauthorized: true,
          ca: env.POSTGRES_CA,
        }
      : false,
  },
  verbose: true,
  strict: true,
});
