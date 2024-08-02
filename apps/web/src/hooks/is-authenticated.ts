import { getMembership } from "@/http/get-membership";
import { getProfile } from "@/http/get-profile";
import { defineAbilityFor } from "@sac/authorization";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export function isAuthenticated() {
    return !!cookies().get('token')?.value
}

export async function auth() {
    const token = cookies().get('token')?.value

    if (!token) {
        redirect('/auth/sign-in')
    }

    try {
        const { user } = await getProfile()
        return { user }
    } catch (error) { }
    redirect('/api/auth/sign-out')
}

export function getCurrentOrg() {
    return cookies().get('org')?.value ?? null
}


export async function getCurrentMembership() {
    const org = getCurrentOrg()
    if (!org) {
        return null
    }
    const { membership } = await getMembership(org)
    return membership
}

export async function ability() {
    const membership = await getCurrentMembership()
    if(!membership) {
        return null
    }
    const ability = defineAbilityFor({
        id: membership.userId,
        role: membership.role,
        organizationId: membership.organizationId,
        __typename: 'UserSubject'
    })

    return ability
}