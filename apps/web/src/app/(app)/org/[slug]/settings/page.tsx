import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ability, getCurrentOrg } from "@/hooks/is-authenticated"
import ShutdownButton from "./shutdown-button"
import { CreateOrgForm } from "../../create-org-form"

export default async function Settings() {
    const currentOrg = getCurrentOrg()
    const permissions = await ability()

    const canUpdateOrganization = permissions?.can('update', "OrganizationSubject")
    const canShutdownOrganization = permissions?.can('manage', 'OrganizationSubject')

    return (
        <div className="space-y-4">
            <h1 className="text-2xl font-bold">Configurações</h1>

            <div className="space-y-4">
                {canUpdateOrganization && (
                    <Card>
                        <CardHeader>
                            <CardTitle>Configurações da organização</CardTitle>
                            <CardDescription>Atualize as informações da sua organização</CardDescription>
                        </CardHeader>
                        <CardContent>
                           <CreateOrgForm />
                        </CardContent>
                    </Card>
                )}
                {canShutdownOrganization && (
                    <Card>
                        <CardHeader>
                            <CardTitle>Desativar organização</CardTitle>
                            <CardDescription>Isto irá deletar todos os dados da organização. Essa ação não poderá ser desfeita</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <ShutdownButton slug={currentOrg!} />
                        </CardContent>
                    </Card>
                )}
            </div>
        </div>
    )
}