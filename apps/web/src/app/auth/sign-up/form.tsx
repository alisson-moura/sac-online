'use client'
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { AlertTriangle, Loader2 } from 'lucide-react'
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import Link from "next/link";
import { useFormState } from "@/hooks/use-form-state";
import { useRouter } from "next/navigation";
import { signUpAction } from "./actions";

export function SignUpForm() {
    const router = useRouter()
    const [state, handleSubmit, isPending] = useFormState(
        signUpAction,
        () => { router.push('/auth/sign-in') }
    )

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            {state.success === false && state.message && (
                <Alert variant='destructive'>
                    <AlertTriangle className="size-4" />
                    <AlertTitle>Houve um erro ao criar sua conta</AlertTitle>
                    <AlertDescription>
                        <p>{state.message}</p>
                    </AlertDescription>
                </Alert>
            )}
            <div className="space-y-1">
                <Label htmlFor="name">Nome</Label>
                <Input name="name" type="text" id="name" required />
                {state.errors?.name && (
                    <p className="text-xs font-medium text-destructive">
                        {state.errors.name[0]}
                    </p>
                )}
            </div>
            <div className="space-y-1">
                <Label htmlFor="email">E-mail</Label>
                <Input name="email" type="email" id="email" required />
                {state.errors?.email && (
                    <p className="text-xs font-medium text-destructive">
                        {state.errors.email[0]}
                    </p>
                )}
            </div>
            <div className="space-y-1">
                <Label htmlFor="password">Senha</Label>
                <Input name="password" type="password" id="password" required />
                {state.errors?.password && (
                    <p className="text-xs font-medium text-destructive">
                        {state.errors.password[0]}
                    </p>
                )}
            </div>
            <div className="space-y-1">
                <Label htmlFor="password_confirmation">Confirme sua senha</Label>
                <Input name="password_confirmation" type="password" id="password_confirmation" required />
                {state.errors?.password_confirmation && (
                    <p className="text-xs font-medium text-destructive">
                        {state.errors.password_confirmation[0]}
                    </p>
                )}
            </div>
            <Button disabled={isPending} type="submit" className="w-full">
                {isPending ? <Loader2 className="size-4 animate-spin" /> : 'Criar conta'}
            </Button>
            <Button type="button" variant='link' size='sm' asChild className="w-full size" >
                <Link href='/auth/sign-in'>
                    Já possui uma conta?
                </Link>
            </Button>
            <Separator />
            <Button type="button" variant="outline" className="w-full">Entrar com sua conta Google</Button>
        </form>
    )
}