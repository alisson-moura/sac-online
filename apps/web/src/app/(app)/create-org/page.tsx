import { CreateOrgForm } from "./form";

export default async function CreateOrgPage() {
    return(
        <div className="space-y-4">
             <h1 className="text-2xl font-bold">Nova organização</h1>
            <CreateOrgForm />
        </div>
    )
}