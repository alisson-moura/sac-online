import { api } from "./api-client"

interface SignUpRequest {
    email: string
    password: string
    name: string
}

export async function signUp(input: SignUpRequest): Promise<void> {
    await api.post('accounts', { json: input })
}