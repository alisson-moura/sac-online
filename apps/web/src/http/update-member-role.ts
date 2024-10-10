import { Role } from "@sac/authorization"
import { api } from "./api-client"

interface UpdateMemberRoleRequest {
    org: string
    memberId: string
    role: Role
}

export async function updateMemberRole({ org, memberId, role }: UpdateMemberRoleRequest): Promise<void> {
    await api.put(`organizations/${org}/members/${memberId}`, {
        json: {
            role
        }
    })
}