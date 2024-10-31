import { api } from "./api-client";

export async function rejectInvite(inviteId: string): Promise<void> {
    await api.post(`invites/${inviteId}/reject`)
}