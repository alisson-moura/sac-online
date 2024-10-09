import { Button } from "./ui/button";
import { ability, getCurrentOrg } from "@/hooks/is-authenticated";
import { NavLink } from "./nav-link";

export async function Tabs() {
    const currentOrg = getCurrentOrg()
    const permissions = await ability()

    const canUpdateOrganization = permissions?.can('update', "OrganizationSubject")
    const canGetMembers = permissions?.can('view', 'UserSubject')
    const canGetForms = permissions?.can('view', 'FormSubject')

    return (
        <div className="border-b py-4">
            <nav className="mx-auto flex max-w-[1200px] items-center gap-2">
                {canGetForms && (
                    <Button asChild variant='ghost' size='sm' className="border border-transparent data-[current=true]:border-border text-muted-foreground data-[current=true]:text-foreground">
                        <NavLink href={`/org/${currentOrg}`}>Formulários</NavLink>
                    </Button>
                )}
                {canGetMembers && (
                    <Button asChild variant='ghost' size='sm' className="border border-transparent data-[current=true]:border-border text-muted-foreground data-[current=true]:text-foreground">
                        <NavLink href={`/org/${currentOrg}/members`}>Membros</NavLink>
                    </Button>
                )}
                {canUpdateOrganization && (
                    <Button asChild variant='ghost' size='sm' className="border border-transparent data-[current=true]:border-border text-muted-foreground data-[current=true]:text-foreground">
                        <NavLink href={`/org/${currentOrg}/settings`}>Configurações</NavLink>
                    </Button>
                )}
            </nav>
        </div>
    )
}