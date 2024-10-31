'use server'

import { acceptInvite } from "@/http/accept-invite"
import { rejectInvite } from "@/http/reject-invite"
import { revalidateTag } from "next/cache"
import { redirect } from "next/navigation"

export async function acceptInviteAction(inviteId: string): Promise<void> {
    await acceptInvite(inviteId)

    revalidateTag('organizations')
}

export async function rejectInviteAction(inviteId:string): Promise<void> {
    await rejectInvite(inviteId)
    revalidateTag('organizations')
    redirect('/')
}