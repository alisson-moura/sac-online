import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table"
import { ability, getCurrentOrg } from "@/hooks/is-authenticated"
import { getInvites } from "@/http/get-invites"
import { XOctagon } from "lucide-react"
import { RevokeInviteButton } from "./revoke-invite-button"


export default async function Invites() {
    const currentOrg = getCurrentOrg()
    const permissions = await ability()
    const { invites } = await getInvites(currentOrg!)

    return (
        <div className="space-y-4">
            {permissions?.can('create', 'InviteSubject') && (
                <Card>
                    <CardHeader>
                        <CardTitle>Novo convite</CardTitle>
                    </CardHeader>
                    <CardContent></CardContent>
                </Card>
            )}

            <div className="space-y-2">
                <h2 className="text-lg font-semibold">Convites</h2>
                <div className="rounded border">
                    <Table>
                        <TableBody>
                            {invites.map(invite => (
                                <TableRow key={invite.id}>
                                    <TableCell className="py-2.5">
                                        <span className="text-muted-foreground">{invite.email}</span>
                                    </TableCell>
                                    <TableCell className="py-2.5 font-medium">
                                        {invite.role}
                                    </TableCell>
                                    <TableCell className="py-2.5">
                                        <div className="flex justify-end">
                                            {permissions?.can('delete', 'InviteSubject') && (
                                                <RevokeInviteButton inviteId={invite.id} />
                                            )}
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                            {invites.length === 0 && (
                                <TableRow>
                                    <TableCell className="text-center text-muted-foreground">Nenhum convite encontrado</TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>
            </div>
        </div>
    )
}