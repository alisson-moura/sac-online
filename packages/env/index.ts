import { createEnv } from '@t3-oss/env-nextjs'
import { z } from 'zod'

export const env = createEnv({
    server: {
        DATABASE_URL: z.string().url(),
        JWT_SECRET: z.string().min(6),
        PORT: z.coerce.number().default(3333),
    },
    client: {},
    shared: {
        NEXT_PUBLIC_API_URL: z.string().url()
    },
    runtimeEnv: {
        DATABASE_URL: process.env.DATABASE_URL,
        JWT_SECRET: process.env.JWT_SECRET,
        PORT: process.env.SERVER_PORT,
        NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL
    },
    emptyStringAsUndefined: true
})