import { Sheet, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { CreateOrgForm } from "../../org/create-org-form";
import { InterceptedSheetContent } from "@/components/intercepted-sheet-content";

export default function CreateOrgSheet() {
    return (
        <Sheet defaultOpen>
            <InterceptedSheetContent>
                <SheetHeader>
                    <SheetTitle>Nova Organização</SheetTitle>
                    <SheetDescription>
                        Informe os dados da sua nova organização
                    </SheetDescription>
                </SheetHeader>
                <div className="py-4">
                    <CreateOrgForm />
                </div>
            </InterceptedSheetContent>
        </Sheet>
    )
}