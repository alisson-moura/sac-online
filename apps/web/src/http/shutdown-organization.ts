import { api } from "./api-client"

export async function shutdownOrganization(slug: string): Promise<void> {
    await api.delete(`organizations/${slug}`)
}