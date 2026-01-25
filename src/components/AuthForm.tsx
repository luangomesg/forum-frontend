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

const authFormSchema = (type: FormType) => {
  return z.object({
    email: z.email("Invalid email address").nonempty("Email is required"),
    password: z
      .string()
      .min(6, "Password must be at least 6 characters")
      .nonempty("Password is required"),
    name:
      type === "register"
        ? z
            .string()
            .min(2, "Name must be at least 2 characters")
            .nonempty("Name is required")
        : z.string().optional(),
  });
};

export default function AuthForm({ type }: { type: FormType }) {
  const formSchema = authFormSchema(type);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      name: "",
    },
    mode: "onChange",
  });
  const isLogin = type === "login";

  return (
    <Form {...form}>
      <form className="form">
        <div className="flex flex-col items-center justify-center">
          <h1 className="text-3xl font-bold mb-2 mt-5 md:text-5xl md:mt-0 lg:text-6xl">
            {isLogin ? "Entrar" : "Registrar"}
          </h1>
          <p className="md:text-[20px] lg:text-[25px]">
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
        <Button type="submit" className="btn">
          {isLogin ? "Entrar" : "Registrar"}
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
