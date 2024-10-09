import { Button } from "@/components/ui/button"
import { shutdownOrganization } from "@/http/shutdown-organization"
import { XCircle } from "lucide-react"
import { redirect } from "next/navigation"

export default async function ShutdownButton({ slug }: { slug: string }) {
    async function shtudownAction() {
        'use server'
        await shutdownOrganization(slug)
        redirect('/')
    }

    return (
        <form action={shtudownAction}>
            <Button variant='destructive' className="w-56" type="submit">
                <XCircle className="size=4 mr-2" />
                Desativar Organização
            </Button>
        </form>
    )
}