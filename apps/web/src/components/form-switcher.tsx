'use client'
import { ChevronsUpDown, Loader2, PlusCircle } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "./ui/dropdown-menu";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { getForms } from "@/http/get-forms";
import { Span } from "next/dist/trace";
import { Skeleton } from "./ui/skeleton";
import { AppAbility } from "@sac/authorization";

export function FormSwitcher({ canCreateForm }: { canCreateForm: boolean }) {
    const { slug, id } = useParams<{ slug: string, id: string }>()
    const { data, isLoading } = useQuery({
        queryKey: [slug, 'forms'],
        queryFn: () => getForms(slug),
        enabled: !!slug
    })

    const currentForm = data && id
        ? data.forms.find(form => form.id === id)
        : null

    return (
        <DropdownMenu>
            <DropdownMenuTrigger className="flex w-[224px] items-center gap-2 rounded p-1 text-sm font-medium outline-none focus-visible:ring-2 focus-visible:ring-primary">
                {isLoading
                    ? <Skeleton className="h-4 w-full" />
                    : <>
                        {currentForm ? <span className="truncate text-left">{currentForm.title}</span> : <span className="text-muted-foreground">Escolha um formulário</span>}
                    </>
                }
                {isLoading
                    ? <Loader2 className="ml-auto size-4 text-muted-foreground animate-spin" />
                    : <ChevronsUpDown className="ml-auto size-4 text-muted-foreground" />
                }
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" alignOffset={-16} sideOffset={12} className="w-[200px]">
                <DropdownMenuGroup>
                    <DropdownMenuLabel>Formulários</DropdownMenuLabel>
                    {data && data.forms.map(form => (
                        <DropdownMenuItem key={form.id} asChild>
                            <Link href={`/org/${slug}/forms/${form.id}`}>
                                <span className="line-clamp-1">{form.title}</span>
                            </Link>
                        </DropdownMenuItem>
                    ))}
                </DropdownMenuGroup>
                {canCreateForm && (
                    <>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem asChild>
                            <Link href={`/org/${slug}/new-form`}>
                                <PlusCircle className="mr-2 size-4" />
                                Novo formulário
                            </Link>
                        </DropdownMenuItem>
                    </>
                )}
            </DropdownMenuContent>
        </DropdownMenu >
    )
}