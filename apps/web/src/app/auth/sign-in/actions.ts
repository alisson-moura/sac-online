'use server'
import { signInWithPassword } from "@/http/sign-in-with-password"
import { HTTPError } from "ky"
import { z } from "zod"
import { cookies } from 'next/headers'
import { acceptInvite } from "@/http/accept-invite"

const signInInputSchema = z.object({
    email: z.string().email({ message: 'Por favor, fornece um e-mail válido' }),
    password: z.string().min(6, { message: 'A senha deve conter ao menos 6 digítos' })
})

export async function signInWithEmailAndPassword(data: FormData) {
    const result = signInInputSchema.safeParse(Object.fromEntries(data))
    if (!result.success) {
        return {
            success: false,
            message: null,
            errors: result.error.flatten().fieldErrors
        }
    }

    try {
        const { token } = await signInWithPassword(result.data)
        cookies().set('token', token, {
            maxAge: 60 * 60 * 24 * 7, // 7 days 
            path: '/'
        })

        const inviteId = cookies().get('inviteId')?.value
        if (inviteId) {
            try {
                await acceptInvite(inviteId)
                cookies().delete('inviteId')
            } catch (error) {}
        }

    } catch (err) {
        if (err instanceof HTTPError) {
            const { message } = await err.response.json<{ message: string }>()
            return { success: false, message, errors: null }
        }
        console.error(err) // sentry
        return { success: false, message: 'Ocorreu um erro inesperado.', errors: null }
    }

    return { success: true, message: 'Ocorreu um erro inesperado.', errors: null }
}