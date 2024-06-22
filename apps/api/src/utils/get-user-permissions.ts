import {defineAbilityFor, type Role, userSchema} from '@sac/authorization'

export function getUserPermissions(membership: {userId: string, role: Role}) {
    const user = userSchema.parse({
        id: membership.userId,
        role: membership.role
    })

    return defineAbilityFor(user)
}