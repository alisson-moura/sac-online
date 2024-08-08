import { api } from "./api-client"

interface CreateFormRequest {
    title: string
    description: string
}

export async function createForm(slug: string, { title, description }: CreateFormRequest): Promise<void> {
    await api.post(`organizations/${slug}/forms`, {
        json: {
            title,
            description
        }
    })
}