'use client'
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { signInWithEmailAndPassword } from "./actions";
import { Separator } from "@/components/ui/separator";
import { AlertTriangle, Loader2 } from 'lucide-react'
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useFormState } from "@/hooks/use-form-state";
import { useRouter } from "next/navigation";

export function SignInForm() {
    const router = useRouter()
    const [state, handleSubmit, isPending] = useFormState(
        signInWithEmailAndPassword,
        () => { router.push('/') }
    )

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            {state.success === false && state.message && (
                <Alert variant='destructive'>
                    <AlertTriangle className="size-4" />
                    <AlertTitle>Falha ao realizar login</AlertTitle>
                    <AlertDescription>
                        <p>{state.message}</p>
                    </AlertDescription>
                </Alert>
            )}
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
                <Link
                    href="/auth/forgot-password"
                    className="text-xs font-medium text-foreground hover:underline">
                    Esqueceu sua senha?
                </Link>
            </div>
            <Button type="submit" className="w-full" disabled={isPending}>
                {isPending ? <Loader2 className="size-4 animate-spin" /> : 'Entrar'}
            </Button>
            <Button type="button" variant='link' size='sm' asChild className="w-full size" >
                <Link href='/auth/sign-up'>
                    Criar uma nova conta
                </Link>
            </Button>
            <Separator />
            <Button type="button" variant="outline" className="w-full">Entrar com sua conta Google</Button>
        </form>
    )
}