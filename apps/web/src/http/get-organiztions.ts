import { api } from "./api-client"

interface GetOrganizationsResponse {
    organizations: {
        name: string;
        id: string;
        slug: string;
        status: string
        domain: string | null;
        avatarUrl: string | null;
    }[]
}

export async function getOrganizations(): Promise<GetOrganizationsResponse> {
    const result = await api.get('organizations').json<GetOrganizationsResponse>()
    return result
}