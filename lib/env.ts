import { config } from "dotenv";
import { z } from "zod";

config({ path: process.env.NODE_ENV === "test" ? ".env.test" : ".env" });

const envSchema = z.object({
  NODE_ENV: z
    .enum(["development", "production", "test"])
    .default("development"),
  POSTGRES_USER: z.string().min(1, "POSTGRES_USER é obrigatório"),
  POSTGRES_PASSWORD: z.string().min(1, "POSTGRES_PASSWORD é obrigatório"),
  POSTGRES_DB: z.string().min(1, "POSTGRES_DB é obrigatório"),
  POSTGRES_HOST: z.string().min(1, "POSTGRES_HOST é obrigatório"),
  POSTGRES_PORT: z.coerce
    .number()
    .int()
    .min(1)
    .max(65535, "POSTGRES_PORT deve ser um número válido entre 1 e 65535"),
  DATABASE_URL: z.url("DATABASE_URL deve ser uma URL válida"),
  POSTGRES_SCHEMA: z.string().default("public"),
  POSTGRES_CA: z
    .string()
    .optional(),
  PORT: z.coerce.number().positive().default(3000),
});

function validateEnv() {
  try {
    return envSchema.parse(process.env);
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.error("❌ Erro nas variáveis de ambiente:");
      console.error(z.prettifyError(error));
    }

    process.exit(1);
  }
}

export const env = validateEnv();

export const isDev = env.NODE_ENV === "development";
export const isProd = env.NODE_ENV === "production";
export const isTest = env.NODE_ENV === "test";
