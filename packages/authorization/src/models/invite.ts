import { z } from 'zod'

export const inviteSchema = z.object({
    __typename: z.literal('InviteSubject').default('InviteSubject'),
    id: z.string(),
    organizationId: z.string(),
    email: z.string()
})

export type Invite = z.infer<typeof inviteSchema>