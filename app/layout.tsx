import type { Metadata } from "next";
import { Outfit} from "next/font/google";
import "./globals.css";

const outfitSans = Outfit({
  variable: "--font-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Sac App",
  description: "Gestão de satisfação do cliente",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body
        className={`${outfitSans.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
