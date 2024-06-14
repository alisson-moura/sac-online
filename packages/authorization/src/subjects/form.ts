import { z } from 'zod'
import { formSchema } from '../models/form';

export const formSubject = z.tuple([
    z.union([
        z.literal('manage'),
        z.literal('view'),
    ]),
    z.union([z.literal('FormSubject'), formSchema])
]);

export type FormSubject = z.infer<typeof formSubject>