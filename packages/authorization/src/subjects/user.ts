import { z } from 'zod'
import { userSchema } from '../models/user';

export const userSubject = z.tuple([
    z.union([
        z.literal('manage'),
        z.literal('invite'),
        z.literal('view'),
        z.literal('update')
    ]),
    z.union([z.literal('UserSubject'), userSchema])

]);

export type UserSubject = z.infer<typeof userSubject>