import { Role } from "@sac/authorization";
import { api } from "./api-client"

interface GetMembershipResponse {
    membership: {
        id: string;
        role: Role
        organizationId: string;
        userId: string
    }
}

export async function getMembership(slug: string): Promise<GetMembershipResponse> {
    const result = await api.get(`organizations/${slug}/membership`).json<GetMembershipResponse>()
    return result
}