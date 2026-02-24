import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Question } from "../types";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface props {
  question: Question;
}

export function DeleteQuestionButton({ question }: props) {
  const router = useRouter();
  async function handleDeleteQuestion() {
    try {
      await fetch(`/api/questions/${question.id}`, {
        method: "DELETE",
        credentials: "include",
      });
      toast.success("Pergunta excluida com sucesso");
      router.refresh();
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Erro ao deletar a pergunta";
      toast.error(errorMessage);
    }
  }
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          className="cursor-pointer mx-auto px-1 py-1 absolute top-3 left-4"
          variant="destructive"
          size={null}
        >
          <Trash2 />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Você tem certeza?</AlertDialogTitle>
          <AlertDialogDescription>
            Essa ação não pode ser desfeita.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="cursor-pointer">
            Cancelar
          </AlertDialogCancel>
          <AlertDialogAction
            variant="destructive"
            className="cursor-pointer"
            onClick={handleDeleteQuestion}
          >
            Excluir
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
