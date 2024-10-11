'use client'

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input"
import { AlertTriangle, Loader2, UserPlus } from 'lucide-react'
import { Alert, AlertTitle } from "@/components/ui/alert";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { useFormState } from "@/hooks/use-form-state";
import { newInviteAction } from "./actions";

export function NewInviteForm() {
    const [state, handleSubmit, isPending] = useFormState(
        newInviteAction
    )

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-2" action="">
            {state.success === false && state.message && (
                <Alert variant='destructive'>
                    <AlertTriangle className="size-4" />
                    <AlertTitle>Houve um erro ao enviar o convite</AlertTitle>
                </Alert>
            )}
            <div className="flex gap-2">
                <Input name="email" type="email" id="email" required placeholder="E-mail" />
                <Select name="role" defaultValue="Assistente">
                    <SelectTrigger className="w-32">
                        <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="Admin">Admin</SelectItem>
                        <SelectItem value="Gestor">Gestor</SelectItem>
                        <SelectItem value="Assistente">Assistente</SelectItem>
                    </SelectContent>
                </Select>
                <Button size='sm'>
                    {isPending ? <Loader2 className="size-4 animate-spin" /> :
                        <>
                            <UserPlus className="size-4 mr-2" />
                            Convidar
                        </>
                    }
                </Button>
            </div>
        </form>
    )
}