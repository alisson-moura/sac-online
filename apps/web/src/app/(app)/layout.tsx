import { isAuthenticated } from "@/hooks/is-authenticated";
import { redirect } from "next/navigation";

export default function AppLayout({
    children,
    sheet
}: Readonly<{
    children: React.ReactNode;
    sheet: React.ReactNode;
}>) {
    if (!isAuthenticated())
        redirect('/auth/sign-in')

    return (
        <>
            {children}
            {sheet}
        </>
    )
}
