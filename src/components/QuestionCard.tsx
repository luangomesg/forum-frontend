"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { formatRelativeTime } from "@/lib/utils";
import { Question } from "@/src/types";
import { api } from "../services/api";
import { useRouter } from "next/navigation";

interface Props {
  question: Question;
}

export function QuestionCard({ question }: Props) {
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);
  const [showAllAnswers, setShowAllAnswers] = useState(false);
  const router = useRouter();

  async function handleSubmitAnswer() {
    if (!answer.trim() || loading) return;

    setLoading(true);

    try {
      await api(`/answers/${question.id}`, {
        method: "POST",
        credentials: "include",
        body: JSON.stringify({ body: answer }),
      });
      setAnswer("");
      router.refresh();
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
    } finally {
      setLoading(false);
    }
  }
  const hasMoreThanOne = question.answers.length > 1;

  const visibleAnswers = showAllAnswers
    ? question.answers
    : question.answers.slice(0, 1);

  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Card className="Card">
            <CardHeader>
              <CardTitle className=" overflow-hidden w-full lg:w-64">
                <h1 className="truncate md:text-[20px] lg:text-[25px]">
                  {question.title}
                </h1>
              </CardTitle>
              <CardDescription className="md:text-[1rem] lg:text-[1.1rem]">
                {question.answers.length === 1
                  ? "1 resposta"
                  : `${question.answers.length} respostas`}{" "}
                • {formatRelativeTime(question.createdAt)}
              </CardDescription>
            </CardHeader>

            <CardContent className="flex gap-2 mx-auto">
              <Badge className="md:text-[1rem]">
                Criador: {question.user.name}
              </Badge>
            </CardContent>
          </Card>
        </DialogTrigger>

        <DialogContent className="w-[90%] max-h-[85vh] overflow-y-auto border border-primary md:min-w-[80vw] md:min-h-[50vh] lg:min-w-[40vw] lg:min-h-[60vh] ">
          <DialogHeader className="self-center">
            <DialogTitle className="text-2xl text-center first-letter:uppercase">
              {question.title}
            </DialogTitle>
          </DialogHeader>

          <div className="flex flex-col space-y-16 ">
            <p className="text-lg text-center font-bold first-letter:uppercase">
              {question.body}
            </p>

            <div>
              <div className="flex items-center gap-3">
                <h3 className="text-lg font-semibold mb-4">
                  Respostas ({question.answers.length})
                </h3>
                <hr className="grow border-0 border-t-2 border-t-[#333]" />
              </div>

              {visibleAnswers.map((answer) => (
                <div
                  key={answer.id}
                  className="rounded-md p-4 border border-border bg-muted/40 mb-4"
                >
                  <p className="first-letter:uppercase">{answer.body}</p>
                  <span className="text-sm text-muted-foreground">
                    {answer.user.name} • {formatRelativeTime(answer.createdAt)}
                  </span>
                </div>
              ))}

              {hasMoreThanOne && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowAllAnswers((prev) => !prev)}
                >
                  {showAllAnswers
                    ? "Mostrar menos"
                    : `Ver mais ${question.answers.length - 1} respostas`}
                </Button>
              )}
            </div>

            {/* Responder */}
            <div className="flex flex-col gap-8 ">
              <Textarea
                placeholder="Escreva sua resposta..."
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
              />

              <Button
                onClick={handleSubmitAnswer}
                disabled={loading}
                className="cursor-pointer "
              >
                {loading ? "Enviando..." : "Responder"}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
