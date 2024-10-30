import { Role } from "@sac/authorization";
import { api } from "./api-client";

interface GetPendingInviteResponse {
    invites: {
        id: string;
        email: string;
        role: Role
        createdAt: string;
        author: {
            id: string;
            name: string | null;
            avatarUrl: string | null;
        };
        organization: {
            name: string
        }
    }[]
}

export async function getPendingInvites(): Promise<GetPendingInviteResponse> {
    const result = await api.get(`invites`).json<GetPendingInviteResponse>()
    return result
}