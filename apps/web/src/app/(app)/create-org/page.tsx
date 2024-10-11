import { Header } from "@/components/header";
import { OrgForm } from "../org/org-form";

export default async function CreateOrgPage() {
    return (
        <div className="py-4 space-y-4">
            <Header />
            <main className="mx-auto w-full max-w-[1200px]">
                <h1 className="text-2xl font-bold">Nova organização</h1>
                <OrgForm />
            </main>
        </div>
    )
}