import { Button } from "@/components/ui/button"
import { ability, getCurrentOrg } from "@/hooks/is-authenticated"
import { PlusIcon } from "lucide-react"
import Link from "next/link"
import { ProjectList } from "./project-list"

export default async function Forms() {
  const currentOrg = getCurrentOrg()
  const permissions = await ability()

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Formulários</h1>
        {
          permissions?.can('manage', 'FormSubject') && (
            <Button size="sm" asChild>
              <Link href={`/org/${currentOrg}/create-form`}>
                <PlusIcon className="size-4 mr-2" />
                Novo Formulário
              </Link>
            </Button>
          )
        }
      </div>
      {permissions?.can('view', 'FormSubject') ? (
        <ProjectList />
      ) : (
        <p className="text-sm text-muted-foreground">
          Você não tem permissão para ver os formulários desta organização.
        </p>
      )}
    </div>
  )
}
