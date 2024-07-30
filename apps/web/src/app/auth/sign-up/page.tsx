import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";

export default function SignUpPage() {
    return (
        <form action="" className="space-y-4">
            <div className="space-y-1">
                <Label htmlFor="name">Nome</Label>
                <Input name="name" type="text" id="name" required />
            </div>
            <div className="space-y-1">
                <Label htmlFor="email">E-mail</Label>
                <Input name="email" type="email" id="email" required />
            </div>
            <div className="space-y-1">
                <Label htmlFor="password">Senha</Label>
                <Input name="password" type="password" id="password" required />
            </div>
            <div className="space-y-1">
                <Label htmlFor="password_confirmation">Confirme sua senha</Label>
                <Input name="password_confirmation" type="password" id="password_confirmation" required />
            </div>
            <Button type="submit" className="w-full">Criar conta</Button>
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