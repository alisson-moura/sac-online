import { betterAuth } from "better-auth";
import { nextCookies } from "better-auth/next-js";
import { pool } from "@/infra/database/pool";

export const auth = betterAuth({
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: false,
  },
  plugins: [nextCookies()],
  database: pool,
  user: {
    additionalFields: {
      status: {
        type: "string",
        required: false,
        defaultValue: "active",
        input: false,
      },
      mobilePhone: {
        type: "string",
        required: true,
        input: true,
      },
    },
  },
});
