import {defineAbilityFor, type Role, userSchema} from '@sac/authorization'

export function getUserPermissions(membership: {organizationId: string, userId: string, role: Role}) {
    const user = userSchema.parse({
        id: membership.userId,
        role: membership.role,
        organizationId: membership.organizationId
    })

    return defineAbilityFor(user)
}