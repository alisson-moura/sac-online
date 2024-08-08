'use server'

import { getCurrentOrg } from "@/hooks/is-authenticated"
import { createForm } from "@/http/create-form"
import { HTTPError } from "ky"
import { z } from "zod"

const formSchema = z.object({
    title: z.string().min(2, { message: 'Por favor, forneça um título válido.' }),
    description: z.string().min(8, { message: 'Por favor, forneça uma descrição válida.' })
})

export async function createFormAction(input: FormData) {
    const { success, error, data } = formSchema.safeParse(Object.fromEntries(input))
    if (success === false)
        return { success: false, message: null, errors: error.flatten().fieldErrors }

    try {
        const slug = getCurrentOrg()
        if (slug) {
            await createForm(slug, {
                title: data.title,
                description: data.title
            })
            return { success: true, message: 'Formulário salvo com sucesso.', errors: null }
        }else {
            throw new Error('Organização inválida')
        }
    } catch (err) {
        if (err instanceof HTTPError) {
            const { message } = await err.response.json<{ message: string }>()
            return { success: false, message, errors: null }
        }
        console.error(err) // sentry
        return { success: false, message: 'Ocorreu um erro inesperado.', errors: null }
    }
}