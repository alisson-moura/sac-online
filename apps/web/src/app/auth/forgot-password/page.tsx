import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";

export default function ForgotPasswordPage() {
    return (
        <form action="" className="space-y-4">
            <div className="space-y-1">
                <Label htmlFor="email">E-mail</Label>
                <Input name="email" type="email" id="email" required />
            </div>
            <Button type="submit" className="w-full">Recuperar senha</Button>
            <Button type="button" variant='link' size='sm' asChild className="w-full size" >
                <Link href='/auth/sign-in'>
                    Voltar para o login
                </Link>
            </Button>
            <Separator />
            <Button type="button" variant="outline" className="w-full">Entrar com sua conta Google</Button>
        </form>
    )
}