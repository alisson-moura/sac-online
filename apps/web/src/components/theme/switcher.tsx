'use client'
import { Moon, Sun } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { useTheme } from "next-themes";

export function ThemeSwitcher() {
    const { resolvedTheme, setTheme } = useTheme()
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant='ghost' size='icon'>
                    {resolvedTheme === 'light'
                        ? <Sun className="size-4" />
                        : <Moon className="size-4" />
                    }
                    <span className="sr-only">Trocar tema</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setTheme('light')}>Claro</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme('dark')}>Escuro</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme('system')}>Default</DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu >
    )
}