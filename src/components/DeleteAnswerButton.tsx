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
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface props {
  answerId: number;
}

export function DeleteAnswerButton({ answerId }: props) {
  const router = useRouter();

  async function handleDeleteAnswer() {
    try {
      await fetch(`/api/answers/${answerId}`, {
        method: "DELETE",
      });
      toast.success("Resposta excluida com sucesso");
      router.refresh();
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Erro ao deletar a resposta";
      toast.error(errorMessage);
    }
  }
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          className="cursor-pointer py-1 px-1 ml-3 translate-y-1"
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
            onClick={handleDeleteAnswer}
          >
            Excluir
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
