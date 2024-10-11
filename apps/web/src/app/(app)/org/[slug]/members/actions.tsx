'use server'

import { getCurrentOrg } from "@/hooks/is-authenticated"
import { newInvite } from "@/http/new-invite"
import { removeMember } from "@/http/remove-member"
import { revokeInvite } from "@/http/revoke-invite"
import { updateMemberRole } from "@/http/update-member-role"
import { Role, rolesSchema } from "@sac/authorization"
import { HTTPError } from "ky"
import { revalidateTag } from "next/cache"
import { z } from "zod"

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


const inviteSchema = z.object({
    email: z.string().email(),
    role: rolesSchema
})

export async function newInviteAction(data: FormData) {
    const currentOrg = getCurrentOrg()
    const result = inviteSchema.safeParse(Object.fromEntries(data))
    console.log(Object.fromEntries(data))
    if (!result.success) {
        return { success: false, message: 'Houve um erro ao enviar o convite.', errors: result.error.flatten().fieldErrors }
    }

    try {
        const { email, role } = result.data
        await newInvite({
            org: currentOrg!,
            email,
            role
        })
    } catch (error) {
        if (error instanceof HTTPError) {
            const { message } = await error.response.json<{ message: string }>()
            return {
                success: false, message, errors: null
            }
        }
        return {
            success: false, message: 'Ocorreu um erro inesperado', errors: null
        }
    }
    revalidateTag(`${currentOrg}/invites`)
    return { success: true, message: 'Convite enviado', errors: null }
}