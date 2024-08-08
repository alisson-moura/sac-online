import { Sheet, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { InterceptedSheetContent } from "@/components/intercepted-sheet-content";
import NewForm from "../../../../org/[slug]/new-form/form";

export default function CreateFormSheet() {
    return (
        <Sheet defaultOpen>
            <InterceptedSheetContent>
                <SheetHeader>
                    <SheetTitle>Novo formulário</SheetTitle>
                    <SheetDescription>
                        Informe os dados do seu novo formulário
                    </SheetDescription>
                </SheetHeader>
                <div className="py-4">
                    <NewForm />
                </div>
            </InterceptedSheetContent>
        </Sheet>
    )
}