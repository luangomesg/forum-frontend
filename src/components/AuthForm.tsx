"use client";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { api } from "@/src/services/api";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { FormType } from "../types";

const authFormSchema = (type: FormType) => {
  return z.object({
    email: z
      .email("Endereço de email inválido")
      .nonempty("Email é obrigatório"),
    password: z
      .string()
      .min(6, "A senha deve ter pelo menos 6 caracteres")
      .nonempty("Senha é obrigatória"),
    name:
      type === "register"
        ? z
            .string()
            .min(2, "Nome deve ter pelo menos 2 caracteres")
            .nonempty("Nome é obrigatório")
        : z.string().optional(),
  });
};

export default function AuthForm({ type }: { type: FormType }) {
  const formSchema = authFormSchema(type);
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      name: "",
    },
    mode: "onChange",
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      if (type === "register") {
        await api("/user", {
          method: "POST",
          credentials: "include",
          body: JSON.stringify({
            name: values.name,
            email: values.email,
            password: values.password,
          }),
        });

        toast.success("Conta criada com sucesso!");

        router.push("/login");
      }

      if (type === "login") {
        await api("/auth/signin", {
          method: "POST",
          credentials: "include",
          body: JSON.stringify({
            email: values.email,
            password: values.password,
          }),
        });
        toast.success("Login realizado com sucesso!");
        router.push("/hub");
      }
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Erro ao criar a conta";
      toast.error(errorMessage);
    }
  }
  const isLogin = type === "login";
  const isSubmitting = form.formState.isSubmitting;

  return (
    <Form {...form} key={type}>
      <form className="form" onSubmit={form.handleSubmit(onSubmit)}>
        <div className="flex flex-col items-center justify-center">
          <h1 className="text-3xl font-bold mb-2 mt-5 md:text-5xl md:mt-0 lg:text-6xl">
            {isLogin ? "Entrar" : "Registrar"}
          </h1>
          <p className="text-center md:text-[20px] lg:text-[25px]">
            Acesse sua conta para continuar
          </p>
        </div>

        {!isLogin && (
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="form-item">
                <FormLabel className="form-label">Nome</FormLabel>
                <FormControl>
                  <Input
                    className="input-label"
                    placeholder="Seu nome"
                    {...field}
                  />
                </FormControl>
                <div className="min-h-7 ">
                  <FormMessage className="md:text-[16px] lg:text-[18px]" />
                </div>
              </FormItem>
            )}
          />
        )}

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="form-item">
              <FormLabel className="form-label">Email</FormLabel>
              <FormControl>
                <Input
                  className="input-label"
                  placeholder="Seu email"
                  type="email"
                  {...field}
                />
              </FormControl>
              <div className="min-h-7">
                <FormMessage className="md:text-[16px] lg:text-[18px]" />
              </div>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem className="form-item">
              <FormLabel className="form-label">Senha</FormLabel>
              <FormControl>
                <Input
                  className="input-label"
                  placeholder="Sua senha"
                  type="password"
                  {...field}
                />
              </FormControl>
              <div className="min-h-7 ">
                <FormMessage className="md:text-[16px] lg:text-[18px]" />
              </div>
            </FormItem>
          )}
        />
        <Button type="submit" className="btn" disabled={isSubmitting}>
          {isSubmitting ? "Carregando..." : isLogin ? "Entrar" : "Registrar"}
        </Button>
        <p className="text-center md:text-[20px] lg:text-[25px]">
          {isLogin ? "Não tem uma conta?" : "Já tem uma conta?"}
          <Link
            href={isLogin ? "/register" : "/login"}
            className="font-bold text-primary ml-1"
          >
            {isLogin ? " Criar conta" : " Entrar"}
          </Link>
        </p>
      </form>
    </Form>
  );
}
