import { api } from "./api-client"

interface GetOrganizationResponse {
    organization: {
        name: string;
        id: string;
        slug: string;
        status: string
        domain: string | null;
        avatarUrl: string | null;
        ownerId: string
        shouldAttachUsersByDomain: boolean
    }
}

export async function getOrganization(slug: string): Promise<GetOrganizationResponse> {
    const result = await api.get(`organizations/${slug}`).json<GetOrganizationResponse>()
    return result
}