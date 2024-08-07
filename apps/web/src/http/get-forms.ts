import { api } from "./api-client"

interface GetFormsResponse {
    forms: Array<{
        id: string
        title: string
        description: string
        status: string
    }>
}

export async function getForms(org: string): Promise<GetFormsResponse> {
    const result = await api.get(`organizations/${org}/forms`).json<GetFormsResponse>()
    return result
}