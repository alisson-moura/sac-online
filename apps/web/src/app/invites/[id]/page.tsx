import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { getInvite } from "@/http/get-invite"
import { AvatarImage } from "@radix-ui/react-avatar"
import relativeTime from 'dayjs/plugin/relativeTime'
import dayjs from "dayjs";
import 'dayjs/locale/pt-br'
import { Separator } from "@/components/ui/separator";
import { auth, isAuthenticated } from "@/hooks/is-authenticated";
import { Button } from "@/components/ui/button";
import { CheckCircle, LogIn, LogOut } from "lucide-react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { acceptInvite } from "@/http/accept-invite";
import Link from "next/link";

dayjs.extend(relativeTime)


export default async function InvitePage({ params }: { params: { id: string } }) {
    const { invite } = await getInvite(params.id)
    const isUserAuthenticated = isAuthenticated()
    let currentUserEmail: string | null = null
    if (isUserAuthenticated) {
        const { user } = await auth()
        currentUserEmail = user.email
    }
    const userIsAuthenticatedWithSameEmailFromInvite = currentUserEmail === invite.email

    async function signFromInvite() {
        'use server'
        cookies().set('inviteId', params.id)
        redirect(`/auth/sign-in?email=${invite.email}`)
    }
    async function acceptInviteAction() {
        'use server'
        await acceptInvite(params.id)
        redirect('/')
    }


    return (
        <div className="min-h-screen flex items-center justify-center flex-col px-4">
            <div className="w-full max-w-sm space-y-6 flex flex-col justify-center">
                <div className="space-y-4 flex flex-col items-center">
                    <Avatar className="size-16">
                        <AvatarFallback />
                        {invite.author.avatarUrl && <AvatarImage src={invite.author.avatarUrl} />}
                    </Avatar>
                    <p className="text-center loading-relaxed text-muted-foreground text-balance">
                        <span className="font-medium text-foreground">{invite.author.name ?? 'Alguém'}</span>{(' ')}
                        convidou você para se junta à
                        {(' ')}<span className="font-medium text-foreground">{invite.organization.name}</span>.{(' ')}
                        <span className="text-xs">{dayjs(invite.createdAt).locale('pt-br').fromNow()}</span>
                    </p>
                </div>
                <Separator />
                {!isUserAuthenticated && (
                    <form action={signFromInvite}>
                        <Button type="submit" variant='secondary' className="w-full">
                            <LogIn className="size-4 mr-2" />
                            Faça login para aceitar o convite
                        </Button>
                    </form>
                )}
                {userIsAuthenticatedWithSameEmailFromInvite && (
                    <form action={acceptInviteAction}>
                        <Button type="submit" variant='secondary' className="w-full">
                            <CheckCircle className="size-4 mr-2" />
                            Juntar-se à {invite.organization.name}
                        </Button>
                    </form>
                )}

                {isUserAuthenticated && !userIsAuthenticatedWithSameEmailFromInvite && (
                    <div className="space-y-4">
                        <p className="text-balance text-center text-sm leading-relaxed text-muted-foreground">
                            Este convite foi enviado para{' '}
                            <span className="font-medium text-foreground">{invite.email}</span>
                            {' '} porém você está autenticado como{' '}
                            <span className="font-medium text-foreground">
                                {currentUserEmail}
                            </span>.
                        </p>
                        <div className="space-y-2">
                                <Button className="w-full" variant="secondary" asChild>
                                    <a href="/api/auth/sign-out">
                                        <LogOut className="mr-2 size-4" />
                                        Sair da conta {currentUserEmail}
                                    </a>
                                </Button>
                                <Button className="w-full" variant="outline" asChild>
                                    <Link href="/">Voltar ao Dashboard</Link>
                                </Button>
                            </div>
                    </div>
                )}
            </div>
        </div>
    )
}