import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";

export default function SignInPage() {
    return (
        <form action="" className="space-y-4">
            <div className="space-y-1">
                <Label htmlFor="email">E-mail</Label>
                <Input name="email" type="email" id="email" required />
            </div>
            <div className="space-y-1">
                <Label htmlFor="password">Senha</Label>
                <Input name="password" type="password" id="password" required />
                <Link
                    href="/auth/forgot-password"
                    className="text-xs font-medium text-foreground hover:underline">
                    Esqueceu sua senha?
                </Link>
            </div>
            <Button type="submit" className="w-full">Entrar com E-mail</Button>
            <Button type="button" variant='link' size='sm' asChild className="w-full size" >
                <Link href='/auth/sign-up'>
                    Criar uma nova conta
                </Link>
            </Button>
        </form>
    )
}