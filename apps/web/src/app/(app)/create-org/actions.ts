'use server'
import { createOrganization } from "@/http/create-organization"
import { HTTPError } from "ky"
import { z } from "zod"

const organizationSchema = z.object({
    name: z.string().min(2, { message: 'Por favor forneça um nome válido.' }),
    domain: z.string().nullable().refine(value => {
        if (value) {
            const domainRegex = /^[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$/
            return domainRegex.test(value)
        }
        return true
    }, { message: 'Por favor, forneça um domínio válido.' }),
    shouldAttachUsersByDomain: z.union([z.literal('on'), z.literal('off'), z.boolean()])
        .transform(value => value === true || value === 'on')
        .default(false)
}).refine(({ shouldAttachUsersByDomain, domain }) => {
    if (shouldAttachUsersByDomain && !domain) {
        return false
    }
    return true
}, { message: 'Por favor, informe um domínio', path: ['domain'] })

export async function createOrganizationAction(data: FormData) {
    const result = organizationSchema.safeParse(Object.fromEntries(data))
    if (!result.success)
        return { success: false, message: null, errors: result.error.flatten().fieldErrors }

    try {
        const { name, domain, shouldAttachUsersByDomain } = result.data
        await createOrganization({ name, domain, shouldAttachUsersByDomain })
        return { success: true, message: 'Organização salva com sucesso.', errors: null }
    } catch (err) {
        if (err instanceof HTTPError) {
            const { message } = await err.response.json<{ message: string }>()
            return { success: false, message, errors: null }
        }
        console.error(err) // sentry
        return { success: false, message: 'Ocorreu um erro inesperado.', errors: null }
    }
}