import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { CardHeader, Card, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { getCurrentOrg } from "@/hooks/is-authenticated";
import { getForms } from "@/http/get-forms";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import relativeTime from 'dayjs/plugin/relativeTime'
import dayjs from "dayjs";
import 'dayjs/locale/pt-br'
dayjs.extend(relativeTime)


export async function ProjectList() {
    const currentOrg = getCurrentOrg()
    const { forms } = await getForms(currentOrg!)

    return (
        <div className="grid grid-cols-3 gap-4">
            {forms.map(form => (
                <Card key={form.id} className="flex flex-col justify-between">
                    <CardHeader>
                        <CardTitle className="text-xl">{form.title}</CardTitle>
                        <CardDescription className="line-clamp-3 leading-relaxed">
                            {form.description}
                        </CardDescription>
                    </CardHeader>
                    <CardFooter className="flex items-center gap-1.5">
                        <span className="text-xs text-muted-foreground">
                            Criado {dayjs(form.createdAt).locale('pt-br').fromNow()}
                        </span>
                        <Button asChild variant='outline' size='sm' className="ml-auto">
                            <Link href={`/org/${currentOrg}/forms/${form.id}`}>
                                Ver <ArrowRight className="size-3 ml-2" />
                            </Link>
                        </Button>
                    </CardFooter>
                </Card>
            ))}
        </div>
    )
}