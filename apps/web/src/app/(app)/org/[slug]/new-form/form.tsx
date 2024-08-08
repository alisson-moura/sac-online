'use client'
import { useParams } from "next/navigation"
import { CheckCircle, AlertTriangle, Loader2 } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useFormState } from "@/hooks/use-form-state"
import { createFormAction } from "./action"
import { queryClient } from "@/lib/react-query"

export default function NewForm() {
    const { slug } = useParams<{ slug: string }>()
    const [state, handleSubmit, isPending] = useFormState(
        createFormAction,
        () => {
            queryClient.invalidateQueries({
                queryKey: [slug, 'forms']
            })
        }
    )

    return (
        <form onSubmit={handleSubmit} className="mt-2 space-y-4">
            {state.success === false && state.message && (
                <Alert variant='destructive'>
                    <AlertTriangle className="size-4" />
                    <AlertTitle>Houve um erro ao salvar seu formulário</AlertTitle>
                    <AlertDescription>
                        <p>{state.message}</p>
                    </AlertDescription>
                </Alert>
            )}
            {state.success && state.message && (
                <Alert variant='success'>
                    <CheckCircle className="size-4" />
                    <AlertTitle>Parabéns!</AlertTitle>
                    <AlertDescription>
                        <p>{state.message}</p>
                    </AlertDescription>
                </Alert>
            )}
            <div className="space-y-1">
                <Label htmlFor="title">Título do formulário</Label>
                <Input name="title" type="text" id="title" required />
                {state.errors?.title && (
                    <p className="text-xs font-medium text-destructive">
                        {state.errors.title[0]}
                    </p>
                )}
            </div>
            <div className="grid w-full gap-1.5">
                <Label htmlFor="description">Descrição</Label>
                <Textarea rows={10} maxLength={300} placeholder="Descreva sua pesquisa." id="description" name="description" />
                <p className="text-sm text-muted-foreground">
                    Essa descrição será exibida para os clientes.
                </p>
                {state.errors?.description && (
                    <p className="text-xs font-medium text-destructive">
                        {state.errors.description[0]}
                    </p>
                )}
            </div>
            <Button disabled={isPending} type="submit" className="w-full">
                {isPending ? <Loader2 className="size-4 animate-spin" /> : 'Salvar'}
            </Button>
        </form>
    )
}