import { api } from "./api-client"

interface GetMembersResponse {
    members: {
        id: string;
        role: string;
        userId: string;
        name: string | null;
        email: string;
        avatarUrl: string | null;
    }[]
}

export async function getMembers(org: string): Promise<GetMembersResponse> {
    const result = await api.get(`organizations/${org}/members`, {
        next: {
            tags: [`${org}/members`]
        }
    }).json<GetMembersResponse>()
    return result
}