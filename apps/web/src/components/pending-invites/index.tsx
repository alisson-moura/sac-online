'use client'
import { Button } from "../ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Check, UserPlus2, X } from 'lucide-react'
import relativeTime from 'dayjs/plugin/relativeTime'
import dayjs from "dayjs";
import 'dayjs/locale/pt-br'
import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getPendingInvites } from "@/http/get-pending-invites";
import { acceptInviteAction, rejectInviteAction } from "./actions";

dayjs.extend(relativeTime)

export function PendingInvites() {
    const queryClient = useQueryClient()
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const { data } = useQuery({
        queryKey: ['pending-invites'],
        queryFn: getPendingInvites,
        enabled: isOpen
    })

    async function handleAcceptInvite(inviteId: string) {
        await acceptInviteAction(inviteId)
        queryClient.invalidateQueries({ queryKey: ['pending-invites'] })
    }

    async function handleRejectInvite(inviteId: string) {
        await rejectInviteAction(inviteId)
        queryClient.invalidateQueries({ queryKey: ['pending-invites'] })
    }

    return (
        <Popover open={isOpen} onOpenChange={setIsOpen} >
            <PopoverTrigger asChild>
                <Button size='icon' variant='ghost'><UserPlus2 className="size-4" /></Button>
            </PopoverTrigger>
            <PopoverContent className="w-80 space-y-2">
                <span className="text-sm font-medium block">Convites pendentes {data?.invites.length}</span>
                {data?.invites.map(invite => (
                    <div key={invite.id} className="space-y-2">
                        <p className="text-sm leading-relaxed text-muted-foreground">
                            <span className="font-medium text-foreground">{invite.author.name}</span>{' '}
                            convidou você para se juntar à{' '}
                            <span className="font-medium text-foreground">{invite.organization.name}</span>{' '}
                            <span>{dayjs(invite.createdAt).locale('pt-br').fromNow()}</span>
                        </p>
                        <div className="flex gap-1">
                            <Button size="sm" variant="outline" onClick={() => handleAcceptInvite(invite.id)}>
                                <Check className="mr-1.5 size-3" />
                                Aceitar
                            </Button>
                            <Button size="sm" variant="ghost" className="text-muted-foreground" onClick={() => handleRejectInvite(invite.id)}>
                                <X className="mr-1.5 size-3" />
                                Recursar
                            </Button>
                        </div>
                    </div>
                ))}
            </PopoverContent>
        </Popover>
    )
}