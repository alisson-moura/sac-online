"use client";
import * as React from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AlertCircleIcon, CheckCircle2Icon, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import Link from "next/link";
import Image from "next/image";

const loginSchema = z.object({
  email: z.email("Informe um e-mail válido, por exemplo: voce@exemplo.com."),
  senha: z
    .string()
    .min(1, "A senha é obrigatória.")
    .max(128, "A senha pode ter no máximo 128 caracteres."),
});

export type LoginInput = z.infer<typeof loginSchema>;

export function LoginForm() {
  const [showPassword, setShowPassword] = React.useState(false);

  const form = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
    mode: "onChange",
    defaultValues: {
      email: "",
      senha: "",
    },
  });

  async function onSubmit(values: LoginInput) {
    try {
      const res = await fetch("/api/v1/users/login", {
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
            "Não foi possível fazer login no momento. Verifique suas credenciais e tente novamente."
        );
      }

      const data = await res.json();
      console.log(data);
      // Redirecionar para dashboard ou página principal
      // window.location.href = "/dashboard";
    } catch (err) {
      let message =
        "Ocorreu um erro inesperado ao fazer login. Verifique sua conexão e tente novamente.";
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
          <h1 className="text-2xl font-bold">Bem-vindo</h1>
          <p className="text-muted-foreground text-balance">
            Acesse sua conta do Sac-App
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
              name="senha"
              render={({ field }) => (
                <FormItem>
                  <div className="flex items-center justify-between">
                    <FormLabel>Senha</FormLabel>
                    <Link
                      href="/forgot"
                      className="text-sm underline-offset-2 hover:underline text-muted-foreground hover:text-foreground"
                    >
                      Esqueci minha senha
                    </Link>
                  </div>
                  <FormControl>
                    <div className="relative">
                      <Input
                        id="senha"
                        type={showPassword ? "text" : "password"}
                        autoComplete="current-password"
                        placeholder="Digite sua senha"
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
                  <FormMessage />
                </FormItem>
              )}
            />

            {form.formState.errors.root && (
              <Alert variant="destructive">
                <AlertCircleIcon />
                <AlertTitle>Não conseguimos fazer seu login.</AlertTitle>
                <AlertDescription>
                  <p>{form.formState.errors.root.message}</p>
                </AlertDescription>
              </Alert>
            )}

            {form.formState.isSubmitSuccessful && (
              <Alert>
                <AlertTitle className="flex items-center">
                  <CheckCircle2Icon className="mr-2 h-4 w-4" /> Login realizado
                  com sucesso!
                </AlertTitle>
                <AlertDescription>
                  Redirecionando você para o painel principal...
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
                {form.formState.isLoading ? "Entrando..." : "Entrar"}
              </Button>
            )}

            <div className="text-center text-sm">
              Não tem uma conta?{" "}
              <Link
                href="/register"
                className="underline underline-offset-4 hover:text-foreground"
              >
                Crie uma aqui
              </Link>
            </div>
          </form>
        </Form>
      </div>
      <div className="bg-muted relative hidden md:block">
        <Image
          src="/login.svg"
          width={10}
          height={10}
          alt="Ilustração representando o login de usuário no Sac-App"
          className="h-full w-full object-fit p-4"
        />
      </div>
    </>
  );
}
