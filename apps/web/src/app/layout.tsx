import type { Metadata } from "next";
import "./globals.css";
import Providers from "./providers";

export const metadata: Metadata = {
  title: "SAC Online",
  description: "SAC Online é um sistema SaaS multi-tenant para gestão de atendimento ao cliente, oferecendo ferramentas para criar e gerenciar organizações, membros, formulários de satisfação e incidentes.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
