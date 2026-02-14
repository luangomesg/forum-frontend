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
      <form onSubmit={form.handleSubmit(onSubmit)}>
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
                <FormMessage className="md:text-[16px] lg:text-[18px]" />
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
                <FormMessage className="md:text-[16px] lg:text-[18px]" />
              </div>
            </FormItem>
          )}
        ></FormField>
        <Button type="submit" disabled={isSubmitting}>
          Criar pergunta
        </Button>
      </form>
    </Form>
  );
}
