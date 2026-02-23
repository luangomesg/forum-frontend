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
import { Label } from "@/components/ui/label";
import { Answers } from "../types";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import { api } from "../services/api";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";

const formSchema = z.object({
  body: z
    .string()
    .min(6, "A resposta deve ter pelo menos 6 caracteres!")
    .max(1000, "A resposta não deve passar de 1000 caracteres!")
    .nonempty(),
});

interface props {
  answer: Answers;
}

export function EditAnswerButton({ answer }: props) {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      body: answer.body,
    },
    mode: "onChange",
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      await api(`/answers/${answer.id}`, {
        method: "PATCH",
        credentials: "include",
        body: JSON.stringify({
          body: values.body,
        }),
      });
      toast.success("Resposta editada com sucesso");
      setOpen(false);
      router.refresh();
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Erro ao editar a resposta";
      toast.error(errorMessage);
    }
  }
  const { isSubmitting } = form.formState;
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          className="px-1 py-1 cursor-pointer ml-3 translate-y-1"
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
            <Field className="mt-2">
              <Label htmlFor="answer-1">Resposta</Label>
              <Textarea
                id="answer-1"
                {...form.register("body")}
                className={cn(
                  "max-h-60 overflow-y-auto",
                  form.formState.errors.body &&
                    "border-destructive focus:border-destructive focus-visible:ring-destructive",
                )}
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
