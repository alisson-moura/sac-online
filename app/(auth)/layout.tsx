import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="bg-muted flex min-h-svh flex-col items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm md:max-w-3xl">
        <div className="flex flex-col gap-6">
          <Card className="overflow-hidden p-0">
            <CardContent className="grid p-0 md:grid-cols-2 relative">
              <Image
                src={"/logo.png"}
                width={80}
                height={20}
                alt={"Logomarca do Sac-App"}
                className="absolute top-0 left-0"
                priority
              />
              {children}
            </CardContent>
          </Card>
          <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
            Ao continuar, você concorda com nossos{" "}
            <a href="#">Termos de Serviço</a> e com a{" "}
            <a href="#">Política de Privacidade</a>.
          </div>
        </div>
      </div>
    </div>
  );
}
