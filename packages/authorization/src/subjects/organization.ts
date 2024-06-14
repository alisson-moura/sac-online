import { z } from 'zod'
import { organizationSchema } from '../models/organization';

export const organizationSubject = z.tuple([
    z.union([
        z.literal('manage'),
        z.literal('update'),
        z.literal('view')
    ]),
    z.union([z.literal('OrganizationSubject'), organizationSchema])

]);

export type OrganizationSubject = z.infer<typeof organizationSubject>