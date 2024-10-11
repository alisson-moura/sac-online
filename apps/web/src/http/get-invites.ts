import { Role } from "@sac/authorization";
import { api } from "./api-client";

interface GetInvitesResponse {
    invites: {
        id: string;
        createdAt: Date;
        role: Role
        email: string;
        author: {
            name: string | null;
            id: string;
        };
    }[]
}

export async function getInvites(org: string): Promise<GetInvitesResponse> {
    const result = await api.get(`organizations/${org}/invites`, {
        next: {
            tags: [`${org}/invites`]
        }
    }).json<GetInvitesResponse>()
    return result
}