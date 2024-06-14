import { z } from 'zod'

export const formSchema = z.object({
    __typename: z.literal('FormSubject').default('FormSubject'),
    id: z.string(),
    organizationId: z.string()
})

export type Form = z.infer<typeof formSchema>