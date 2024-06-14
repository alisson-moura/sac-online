import { z } from 'zod'
import { rolesSchema } from "../roles"


export const userSchema = z.object({
    __typename: z.literal('UserSubject').default('UserSubject'),
    id: z.string(),
    role: rolesSchema,
    organizationId: z.string()
})

export type User = z.infer<typeof userSchema>