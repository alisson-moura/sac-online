import { Role } from "@sac/authorization";
import { api } from "./api-client";

interface GetInviteResponse {
    invite: {
        id: string;
        email: string;
        role: Role
        createdAt: Date;
        author: {
            id: string;
            name: string | null;
            avatarUrl: string | null;
        };
        organization: {
            name: string
        }
    }
}

export async function getInvite(inviteId: string): Promise<GetInviteResponse> {
    const result = await api.get(`invites/${inviteId}`).json<GetInviteResponse>()
    return result
}