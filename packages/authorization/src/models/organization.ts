import { z } from 'zod'

export const organizationSchema = z.object({
    __typename: z.literal('OrganizationSubject').default('OrganizationSubject'),
    id: z.string()
})

export type Organization = z.infer<typeof organizationSchema>