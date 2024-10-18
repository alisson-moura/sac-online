import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { CardHeader, Card, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";

export function ProjectList() {
    return (
        <div className="grid grid-cols-3 gap-4">
            <Card>
                <CardHeader>
                    <CardTitle>Projeto 01</CardTitle>
                    <CardDescription className="line-clamp-3 leading-relaxed">
                        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptate deserunt libero aut perferendis inventore pariatur expedita dolore facilis autem? Sapiente hic odio, ipsam officiis blanditiis quos similique vel. Sed, alias?
                    </CardDescription>
                </CardHeader>
                <CardFooter className="flex items-center gap-1.5">
                    <Avatar className="size-4">
                        <AvatarImage src="https://github.com/alisson-moura.png" />
                        <AvatarFallback />
                    </Avatar>
                    <span className="text-xs text-muted-foreground">
                        Criado por <span className="font-medium text-foreground">Alisson Moura</span> à um dia
                    </span>
                    <Button variant='outline' size='sm' className="ml-auto">Ver <ArrowRight className="size-3 ml-2"/></Button>
                </CardFooter>
            </Card>
        </div>
    )
}