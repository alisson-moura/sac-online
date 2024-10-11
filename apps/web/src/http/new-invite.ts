import { Role } from "@sac/authorization"
import { api } from "./api-client"

interface NewInviteRequest {
    email: string
    role: Role
    org: string
}

export async function newInvite({ email, role, org }: NewInviteRequest): Promise<void> {
    await api.post(`organizations/${org}/invites`, {
        json: {
            email,
            role
        }
    })
}