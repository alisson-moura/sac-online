import { Header } from "@/components/header";
import NewForm from "./form";

export default async function NewFormPage() {
  return (
    <div className="py-4 space-y-4">
      <Header />
      <main className="mx-auto w-full max-w-[1200px]">
        <h1 className="text-2xl font-bold">Novo formulário</h1>
        <NewForm />
      </main>
    </div>
  )
}