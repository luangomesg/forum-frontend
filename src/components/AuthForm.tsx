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
      <form className="w-full space-y-4 form">
        <div className="flex flex-col items-center justify-center">
          <h1 className="text-3xl font-bold mb-2 mt-5">
            {isLogin ? "Entrar" : "Registrar"}
          </h1>
          <span>Acesse sua conta para continuar</span>
        </div>
        {!isLogin && (
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Your name" {...field} />
                </FormControl>
                <div className="min-h-5 ">
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />
        )}
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="Your email" type="email" {...field} />
              </FormControl>
              <div className="min-h-5">
                <FormMessage />
              </div>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input placeholder="Your password" type="password" {...field} />
              </FormControl>
              <div className="min-h-5">
                <FormMessage />
              </div>
            </FormItem>
          )}
        />
        <Button type="submit" className="btn">
          {isLogin ? "Entrar" : "Registrar"}
        </Button>
        <p className="text-center">
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
