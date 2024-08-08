import { Button } from "./ui/button";
import { getCurrentOrg } from "@/hooks/is-authenticated";
import { NavLink } from "./nav-link";

export function Tabs() {
    const currentOrg = getCurrentOrg()

    return (
        <div className="border-b py-4">
            <nav className="mx-auto flex max-w-[1200px] items-center gap-2">
                <Button asChild variant='ghost' size='sm' className="border border-transparent data-[current=true]:border-border text-muted-foreground data-[current=true]:text-foreground">
                    <NavLink href={`/org/${currentOrg}`}>Formulários</NavLink>
                </Button>
                <Button asChild variant='ghost' size='sm' className="border border-transparent data-[current=true]:border-border text-muted-foreground data-[current=true]:text-foreground">
                    <NavLink href={`/org/${currentOrg}/members`}>Membros</NavLink>
                </Button>
                <Button asChild variant='ghost' size='sm' className="border border-transparent data-[current=true]:border-border text-muted-foreground data-[current=true]:text-foreground">
                    <NavLink href={`/org/${currentOrg}/details`}>Organização</NavLink>
                </Button>
            </nav>
        </div>
    )
}