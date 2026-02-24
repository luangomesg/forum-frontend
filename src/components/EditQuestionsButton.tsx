import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Field, FieldGroup } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Question } from "../types";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { useState } from "react";

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

interface props {
  question: Question;
}

export function EditQuestionsButton({ question }: props) {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: question.title,
      body: question.body,
    },
    mode: "onChange",
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      await fetch(`/api/questions/${question.id}`, {
        method: "PATCH",
        body: JSON.stringify({
          title: values.title,
          body: values.body,
        }),
      });
      toast.success("Pergunta editada com sucesso");
      setOpen(false);
      router.refresh();
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Erro ao editar a pergunta";
      toast.error(errorMessage);
    }
  }
  const { isSubmitting } = form.formState;
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          className="px-1 py-1 absolute top-3 left-12 "
          variant="default"
          size={null}
        >
          <Pencil />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-sm max-h-[90vh] overflow-y-auto">
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <DialogHeader>
            <DialogTitle>Editar Pergunta</DialogTitle>
            <DialogDescription>
              Faça alterações na sua pergunta aqui. Clique em salvar quando
              terminar.
            </DialogDescription>
          </DialogHeader>
          <FieldGroup>
            <Field>
              <Label htmlFor="title-1">Titulo</Label>
              <Input id="title-1" disabled {...form.register("title")} />
            </Field>
            <Field>
              <Label htmlFor="body-1">Pergunta</Label>
              <Textarea
                id="body-1"
                className={cn(
                  "max-h-60 overflow-y-auto",
                  form.formState.errors.body &&
                    "border-destructive focus:border-destructive focus-visible:ring-destructive",
                )}
                {...form.register("body")}
              />
              <div className="min-h-7 -translate-y-2">
                {form.formState.errors?.body && (
                  <p className="text-red-500 text-[12px]">
                    {form.formState.errors.body.message}
                  </p>
                )}
              </div>
            </Field>
          </FieldGroup>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline" className="cursor-pointer">
                Cancelar
              </Button>
            </DialogClose>
            <Button type="submit" className="cursor-pointer">
              {isSubmitting ? "Salvando..." : "Salvar alterações"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
