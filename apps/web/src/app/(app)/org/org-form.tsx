'use client'
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AlertTriangle, Loader2 } from 'lucide-react'
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useFormState } from "@/hooks/use-form-state";
import { createOrganizationAction, OrganizationSchema, updateOrganizationAction } from "./actions";
import { Checkbox } from "@/components/ui/checkbox";


interface OrgFormProps {
    isUpdating?: boolean
    initialData?: OrganizationSchema
}

export function OrgForm({ isUpdating = false, initialData }: OrgFormProps) {
    const formAction = isUpdating ? updateOrganizationAction : createOrganizationAction

    const [state, handleSubmit, isPending] = useFormState(
        formAction,
        () => { }
    )

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            {state.success === false && state.message && (
                <Alert variant='destructive'>
                    <AlertTriangle className="size-4" />
                    <AlertTitle>Houve um erro ao criar sua organização</AlertTitle>
                    <AlertDescription>
                        <p>{state.message}</p>
                    </AlertDescription>
                </Alert>
            )}
            {state.success && state.message && (
                <Alert variant='success'>
                    <AlertTriangle className="size-4" />
                    <AlertTitle>Parabéns!</AlertTitle>
                    <AlertDescription>
                        <p>{state.message}</p>
                    </AlertDescription>
                </Alert>
            )}
            <div className="space-y-1">
                <Label htmlFor="name">Nome da organização</Label>
                <Input name="name" type="text" id="name" required defaultValue={initialData?.name} />
                {state.errors?.name && (
                    <p className="text-xs font-medium text-destructive">
                        {state.errors.name[0]}
                    </p>
                )}
            </div>
            <div className="space-y-1">
                <Label htmlFor="domain">Domínio de E-mail</Label>
                <Input name="domain" type="text" id="domain" inputMode="url" placeholder="exemplo.com" defaultValue={initialData?.domain ?? undefined} />
                {state.errors?.domain && (
                    <p className="text-xs font-medium text-destructive">
                        {state.errors.domain[0]}
                    </p>
                )}
            </div>
            <div className="space-y-1">
                <div className="flex items-baseline space-x-2">
                    <Checkbox className="translate-y-0.5" name="shouldAttachUsersByDomain" id="shouldAttachUsersByDomain"  defaultChecked={initialData?.shouldAttachUsersByDomain} />
                    <label htmlFor="shouldAttachUsersByDomain" className="space-y-1">
                        <span className="text-sm font-medium leading-none">Adicionar novos memboros automaticamente</span>
                        <p className="text-sm text-muted-foreground">Isto irá automaticamente convidar todos os membros com o mesmo domínio de e-mail para a sua organização</p>
                    </label>
                </div>
            </div>

            <Button disabled={isPending} type="submit" className="w-full">
                {isPending ? <Loader2 className="size-4 animate-spin" /> : 'Salvar'}
            </Button>
        </form>
    )
}