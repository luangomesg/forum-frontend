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
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";
import logoLg from "../../../../assets/images/yourforum-logo.svg";

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
      await fetch("/api/questions", {
        method: "POST",
        credentials: "include",
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
      <div className="absolute top-1 md:relative md:min-w-[85%] lg:flex lg:flex-col lg:space-y-15 lg:min-w-[40%]">
        <Link href="/hub" className="lg:w-full lg:text-center">
          <button className="btn-back-hub">Voltar ao HUB</button>
        </Link>
        <Image
          src={logoLg}
          alt="YourForum Logo"
          className="hidden lg:block drop-shadow-lg lg:col-start-1 lg:mx-auto lg:w-[75%]"
          priority
        />
      </div>
      <div className="flex flex-col items-center w-full lg:w-[50%]">
        <div className="card-new-question">
          <h1 className="font-bold text-[20px] md:text-[30px]">
            Criar Nova Pergunta
          </h1>
        </div>
        <form
          className="form-new-question"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="md:text-[19px]"> Titulo</FormLabel>
                <FormControl>
                  <Input
                    className="md:text-[19px] md:py-6"
                    placeholder="Titulo"
                    {...field}
                    maxLength={60}
                  />
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
                <FormLabel className="md:text-[19px]">Descrição</FormLabel>
                <FormControl>
                  <Textarea
                    className="md:text-[19px] md:py-6"
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
            className=" cursor-pointer font-bold md:text-[21px] md:py-6"
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
