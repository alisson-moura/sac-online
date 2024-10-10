import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table"
import { ability, getCurrentOrg } from "@/hooks/is-authenticated"
import { getMembers } from "@/http/get-members"
import { getOrganization } from "@/http/get-organiztion"
import { ArrowLeftRight, Crown } from "lucide-react"
import Image from "next/image"

export default async function List() {
    const currentOrg = getCurrentOrg()
    const permissions = await ability()
    const [{ members }, { organization }] = await Promise.all([
        getMembers(currentOrg!),
        getOrganization(currentOrg!)
    ])

    return (
        <div className="space-y-2">
            <h2 className="text-lg font-semibold">Membros</h2>

            <div className="rounded border">
                <Table>
                    <TableBody>
                        {members.map(member => (
                            <TableRow key={member.id}>
                                <TableCell className="py-2.5" style={{ width: 48 }}>
                                    <Avatar>
                                        <AvatarFallback />
                                        {member.avatarUrl && (
                                            <Image alt="Member avatar" src={member.avatarUrl} width={32} height={32} className="aspect-square size-full" />
                                        )}
                                    </Avatar>
                                </TableCell>
                                <TableCell className="py-2.5">
                                    <div className="flex flex-col">
                                        <span className="font-medium inline-flex items-center gap-2">
                                            {member.name}
                                            {organization.ownerId === member.userId && (
                                                <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
                                                    <Crown className="size-3" />
                                                    Dono
                                                </span>
                                            )}
                                        </span>
                                        <span className="text-xs text-muted-foreground">{member.email}</span>
                                    </div>
                                </TableCell>
                                <TableCell className="py-2.5">
                                    <div className="flex items-center justify-end gap-2">
                                        {permissions?.can('manage', 'OrganizationSubject') && <Button size='sm' variant='ghost'>
                                             <ArrowLeftRight className="size-4 mr-2"/>
                                             Transformar em dono
                                            </Button>}
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    )
}