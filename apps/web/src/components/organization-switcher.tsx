import { ChevronsUpDown, PlusCircle } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { AvatarImage } from "@radix-ui/react-avatar";
import Link from "next/link";
import { getOrganizations } from "@/http/get-organiztions";
import { getCurrentOrg } from "@/hooks/is-authenticated";

export async function OrganizationSwitcher() {
    const currentOrg = getCurrentOrg()
    const { organizations } = await getOrganizations()
    const currentOrganization = organizations.find(org => org.slug === currentOrg)

    return (
        <DropdownMenu>
            <DropdownMenuTrigger className="flex w-[168px] items-center gap-2 rounded p-1 text-sm font-medium outline-none focus-visible:ring-2 focus-visible:ring-primary">
                {currentOrganization ? (
                    <>
                        <Avatar className="mr-2 size-4">
                            {currentOrganization.avatarUrl && <AvatarImage src={currentOrganization.avatarUrl} />}
                            <AvatarFallback />
                        </Avatar>
                        <span className="truncate text-left">{currentOrganization.name}</span>
                    </>
                ) : <span className="text-muted-foreground">Selecione uma organização</span>}
                <ChevronsUpDown className="ml-auto size-4 text-muted-foreground" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" alignOffset={-16} sideOffset={12} className="w-[200px]">
                <DropdownMenuGroup>
                    <DropdownMenuLabel>Organizações</DropdownMenuLabel>
                    {organizations.map(organization => (
                        <DropdownMenuItem key={organization.id} asChild>
                            <Link href={`/org/${organization.slug}`}>
                                <Avatar className="mr-2 size-4">
                                    {organization.avatarUrl && <AvatarImage src={organization.avatarUrl} />}
                                    <AvatarFallback />
                                </Avatar>
                                <span className="line-clamp-1">{organization.name}</span>
                            </Link>
                        </DropdownMenuItem>
                    ))}
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                    <Link href='/create-org'>
                        <PlusCircle className="mr-2 size-4" />
                        Nova organização
                    </Link>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu >
    )
}