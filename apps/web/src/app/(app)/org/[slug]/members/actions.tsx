'use server'

import { getCurrentOrg } from "@/hooks/is-authenticated"
import { removeMember } from "@/http/remove-member"
import { revokeInvite } from "@/http/revoke-invite"
import { updateMemberRole } from "@/http/update-member-role"
import { Role } from "@sac/authorization"
import { AwardIcon } from "lucide-react"
import { revalidateTag } from "next/cache"

export async function removeMemberAction(memberId: string) {
    const currentOrg = getCurrentOrg()
    await removeMember({
        slug: currentOrg!,
        memberId
    })

    revalidateTag(`${currentOrg}/members`)
}

export async function updateMemberRoleAction(memberId: string, role: Role) {
    const currentOrg = getCurrentOrg()
    await updateMemberRole({
        org: currentOrg!,
        memberId,
        role
    })
    revalidateTag(`${currentOrg}/members`)
}

export async function revokeInviteAction(inviteId: string) {
    const currentOrg = getCurrentOrg()
    await revokeInvite(currentOrg!, inviteId)
    revalidateTag(`${currentOrg}/invites`)
}