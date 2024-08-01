'use server'
import { signUp } from "@/http/sign-up"
import { HTTPError } from "ky"
import { z } from "zod"

const signUpInputSchema = z.object({
    email: z.string().email({ message: 'Por favor, fornece um e-mail válido' }),
    name: z.string().refine(value => value.split(' ').length > 1, 'Por favor, foneça seu nome completo'),
    password: z.string().min(6, { message: 'A senha deve conter ao menos 6 digítos' }),
    password_confirmation: z.string()
}).refine(data => data.password === data.password_confirmation, {
    message: 'A confirmação da senha não está correta',
    path: ['password_confirmation']
})

export async function signUpAction(data: FormData) {
    const result = signUpInputSchema.safeParse(Object.fromEntries(data))
    if (!result.success)
        return { success: false, message: null, errors: result.error.flatten().fieldErrors }

    try {
        await signUp(result.data)
        return { success: true, message: null, errors: null }
    } catch (err) {
        if (err instanceof HTTPError) {
            const { message } = await err.response.json<{ message: string }>()
            return { success: false, message, errors: null }
        }
        console.error(err) // sentry
        return { success: false, message: 'Ocorreu um erro inesperado.', errors: null }
    }
}