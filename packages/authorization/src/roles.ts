import { z } from 'zod'

export const rolesSchema = z.union([
    z.literal('Admin'),
    z.literal('Gestor'),
    z.literal('Assistente'),
    z.literal('Cliente'),
])


export type Role = z.infer<typeof rolesSchema>