"use client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { api } from "@/src/services/api";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

const formSchema = z.object({
  title: z
    .string()
    .min(6, "O titulo deve ter pelo menos 6 caracteres!")
    .max(60, "O titulo não deve passar de 60 caracteres!")
    .nonempty(),

  body: z
    .string()
    .min(20, "A pergunta deve ter pelo menos 20 caracteres!")
    .max(1000, "A pergunta não deve passar de 1000 caracteres!")
    .nonempty(),
});

export default function AnswersPage() {
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      body: "",
    },
    mode: "onChange",
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      await api("/questions", {
        method: "POST",
        body: JSON.stringify({
          title: values.title,
          body: values.body,
        }),
      });
      toast.success("Pergunta criada com sucesso");
      router.push("/questions");
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Erro ao criar a conta";
      toast.error(errorMessage);
    }
  }

  const isSubmitting = form.formState.isSubmitting;
  return (
    <Form {...form}>
      <Link href="/hub" className="absolute top-1 ">
        <button className="border border-sidebar py-1 px-10 rounded-xl bg-primary text-primary-foreground font-bold cursor-pointer w-[80vw] hover:bg-primary/90">
          Voltar ao HUB
        </button>
      </Link>
      <div className="flex flex-col items-center w-full">
        <div className="flex min-w-[85%] max-w-[85%] h-[15vh] border-t border-l border-r border-primary rounded-t-xl justify-center items-center bg-sidebar-primary/5">
          <h1 className="font-bold text-[20px]">Criar Nova Pergunta</h1>
        </div>
        <form
          className="flex flex-col min-w-[85%] max-w-[85%] bg-card text-card-foreground border border-primary rounded-b-xl py-6 px-6"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel> Titulo</FormLabel>
                <FormControl>
                  <Input placeholder="Titulo" {...field} maxLength={60} />
                </FormControl>
                <div className="min-h-7 ">
                  <FormMessage className="text-[11px] md:text-[16px] lg:text-[18px]" />
                </div>
              </FormItem>
            )}
          ></FormField>

          <FormField
            control={form.control}
            name="body"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Descrição</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Escreva sua pergunta..."
                    {...field}
                    maxLength={1000}
                  />
                </FormControl>
                <div className="min-h-7 ">
                  <FormMessage className="text-[11px] md:text-[16px] lg:text-[18px]" />
                </div>
              </FormItem>
            )}
          ></FormField>
          <Button
            className=" cursor-pointer font-bold"
            type="submit"
            disabled={isSubmitting}
          >
            Criar pergunta
          </Button>
        </form>
      </div>
    </Form>
  );
}
