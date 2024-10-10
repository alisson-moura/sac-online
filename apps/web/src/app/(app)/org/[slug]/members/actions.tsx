'use server'

import { getCurrentOrg } from "@/hooks/is-authenticated"
import { removeMember } from "@/http/remove-member"
import { revalidateTag } from "next/cache"

export async function removeMemberAction(memberId: string) {
    const currentOrg = getCurrentOrg()
    await removeMember({
        slug: currentOrg!,
        memberId
    })

    revalidateTag(`${currentOrg}/members`)
}