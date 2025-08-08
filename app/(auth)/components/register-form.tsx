"use client";

import * as React from "react";
import { z } from "zod/v4";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  AlertCircleIcon,
  CheckCircle2Icon,
  ChevronRight,
  Eye,
  EyeOff,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import Link from "next/link";
import Image from "next/image";

const registerSchema = z.object({
  nome: z
    .string()
    .min(3, "O nome deve ter ao menos 3 caracteres.")
    .max(100, "O nome pode ter no máximo 100 caracteres."),
  email: z.email("Informe um e-mail válido, por exemplo: voce@exemplo.com."),
  telefone: z
    .string()
    .transform((v) => v.trim())
    .refine((v) => {
      const digits = v.replace(/\D/g, "");
      return digits.length === 10 || digits.length === 11;
    }, "Informe um telefone válido com DDD, por exemplo: (11) 91234-5678."),
  senha: z
    .string()
    .min(
      8,
      "A senha deve ter pelo menos 8 caracteres para garantir sua segurança."
    )
    .max(128, "A senha pode ter no máximo 128 caracteres."),
});

export type CreateUserInput = z.infer<typeof registerSchema>;

function formatPhoneBR(value: string) {
  const digits = value.replace(/\D/g, "").slice(0, 11);
  const ddd = digits.slice(0, 2);
  const middle =
    digits.length > 10
      ? digits.slice(2, 7) // celular 5 dígitos
      : digits.slice(2, 6); // fixo 4 dígitos
  const end = digits.length > 10 ? digits.slice(7, 11) : digits.slice(6, 10);

  if (digits.length <= 2) return digits;
  if (digits.length <= 6) return `(${ddd}) ${digits.slice(2)}`;
  if (digits.length <= 10) return `(${ddd}) ${middle}-${end}`;
  return `(${ddd}) ${middle}-${end}`;
}

export function RegisterForm() {
  const [showPassword, setShowPassword] = React.useState(false);

  const form = useForm<CreateUserInput>({
    resolver: zodResolver(registerSchema),
    mode: "onChange",
    defaultValues: {
      nome: "",
      email: "",
      telefone: "",
      senha: "",
    },
  });

  async function onSubmit(values: CreateUserInput) {
    try {
      const res = await fetch("/api/v1/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(
          body?.message ||
            "Não foi possível criar sua conta no momento. Tente novamente em alguns instantes."
        );
      }
    } catch (err) {
      let message =
        "Ocorreu um erro inesperado ao criar sua conta. Verifique sua conexão e tente novamente.";
      if (err instanceof Error) message = err.message;
      form.setError("root", {
        message,
      });
    }
  }

  return (
    <>
      <div className="p-6 md:p-8">
        <div className="flex flex-col items-center text-center mb-6">
          <h1 className="text-2xl font-bold">Crie sua conta</h1>
          <p className="text-muted-foreground text-balance">
            Cadastre-se para começar
          </p>
        </div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-6"
            noValidate
          >
            <FormField
              control={form.control}
              name="nome"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome</FormLabel>
                  <FormControl>
                    <Input
                      id="nome"
                      placeholder="Seu nome completo"
                      autoComplete="name"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>E-mail</FormLabel>
                  <FormControl>
                    <Input
                      id="email"
                      type="email"
                      placeholder="voce@exemplo.com"
                      autoComplete="email"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="telefone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Telefone</FormLabel>
                  <FormControl>
                    <Input
                      id="telefone"
                      type="tel"
                      inputMode="tel"
                      placeholder="(11) 91234-5678"
                      autoComplete="tel"
                      maxLength={16}
                      value={field.value}
                      onChange={(e) => {
                        const formatted = formatPhoneBR(e.target.value);
                        field.onChange(formatted);
                      }}
                    />
                  </FormControl>
                  <FormDescription className="text-xs">
                    Informe um número com DDD para contato, preferencialmente
                    via WhatsApp.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="senha"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Senha</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        id="senha"
                        type={showPassword ? "text" : "password"}
                        autoComplete="new-password"
                        placeholder="Crie uma senha"
                        className="pr-10"
                        {...field}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword((s) => !s)}
                        aria-label={
                          showPassword ? "Ocultar senha" : "Mostrar senha"
                        }
                        className="absolute inset-y-0 right-0 flex items-center pr-3 text-muted-foreground hover:text-foreground"
                      >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4" aria-hidden="true" />
                        ) : (
                          <Eye className="h-4 w-4" aria-hidden="true" />
                        )}
                      </button>
                    </div>
                  </FormControl>
                  <FormDescription className="text-xs">
                    Mínimo de 8 caracteres.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {form.formState.errors.root && (
              <Alert variant="destructive">
                <AlertCircleIcon />
                <AlertTitle>Não conseguimos criar sua conta.</AlertTitle>
                <AlertDescription>
                  <p>{form.formState.errors.root.message}</p>
                </AlertDescription>
              </Alert>
            )}

            {form.formState.isSubmitSuccessful && (
              <Alert>
                <AlertTitle className="flex items-center">
                  <CheckCircle2Icon className="mr-2 h-4 w-4" /> Parabéns! Conta
                  criada com sucesso
                </AlertTitle>
                <AlertDescription>
                  Agora você pode acessar sua conta informando seu e-mail e
                  senha.
                  <Button
                    asChild
                    className="w-full mt-2"
                    size="sm"
                    type="button"
                  >
                    <Link href="/login">
                      Acesse sua conta aqui
                      <ChevronRight className="ml-4 h-2 w-2" />
                    </Link>
                  </Button>
                </AlertDescription>
              </Alert>
            )}

            {!form.formState.isSubmitSuccessful && (
              <Button
                type="submit"
                className="w-full"
                disabled={
                  form.formState.isLoading || form.formState.isSubmitSuccessful
                }
                aria-busy={form.formState.isLoading}
                aria-live="polite"
              >
                {form.formState.isLoading
                  ? "Criando sua conta..."
                  : "Criar conta"}
              </Button>
            )}

            <div className="text-center text-sm">
              Já tem uma conta?{" "}
              <a href="/login" className="underline underline-offset-4">
                Entrar
              </a>
            </div>
          </form>
        </Form>
      </div>

      <div className="bg-muted relative hidden md:block">
        <Image
          src="/register.svg"
          alt="Ilustração representando o cadastro de usuário no Sac-App"
          className="h-full w-full object-fill"
        />
      </div>
    </>
  );
}
