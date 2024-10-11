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

export async function revokeInvite(org: string, inviteId: string): Promise<void> {
 await api.delete(`organizations/${org}/invites/${inviteId}`, {
        next: {
            tags: [`${org}/invites`]
        }
    }).json<GetInvitesResponse>()   
}