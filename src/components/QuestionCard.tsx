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
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { formatRelativeTime } from "@/lib/utils";
import { Question } from "@/src/types";
import { api } from "../services/api";

interface Props {
  question: Question;
}

export function QuestionCard({ question }: Props) {
  const [open, setOpen] = useState(false);
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmitAnswer() {
    if (!answer.trim()) return;

    try {
      await api(`/answers/${question.id}`, {
        method: "POST",
        body: JSON.stringify({ body: answer }),
      });
      setAnswer("");
      window.location.reload();
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Card
        className="Card transition hover:bg-background/30 mb-6 mt-10 border-primary z-10"
        onClick={() => setOpen((prev) => !prev)}
      >
        <CardHeader className="cursor-pointer">
          <CardTitle className="md:text-2xl lg:text-3xl">
            {question.title}
          </CardTitle>
          <CardDescription className="md:text-[1rem] lg:text-[1.1rem]">
            {question.answers.length == 1
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

        {open && (
          <CardContent
            className="space-y-4 border-t border-l border-r border-border"
            onClick={(e) => e.stopPropagation()} // evita fechar ao clicar dentro
          >
            <h1 className="text-[1.1rem] mx-auto font-bold text-foreground border border-ring mt-3 p-3 rounded-md md:text-[1.4rem] lg:text-[1.6rem] ">
              {question.body}
            </h1>
            {question.answers.length === 0 ? (
              <span className="text-[1.2rem] md:text-[1.4rem] lg:text-[1.6rem]">
                Ainda sem respostas...
              </span>
            ) : (
              <div className="flex items-center gap-3">
                <span className="text-sm md:text-[1.4rem] lg:text-[1.6rem]">
                  Respostas ({question.answers.length})
                </span>
                <hr className="grow border-0 border-t-2 border-t-[#333]" />
              </div>
            )}
            {/* Respostas */}
            <div className="space-y-3 mt-2">
              {question.answers.map((answer) => (
                <div
                  key={answer.id}
                  className="rounded-md p-3 border border-border bg-input/30 md:p-5 md:relative md:space-y-3"
                >
                  <p className="text-sm text-center font-normal md:text-[1.2rem] md:text-start lg:text-[1.3rem]">
                    {answer.body}
                  </p>
                  <span className="text-[0.7rem] text-muted-foreground md:text-[1rem] md:text-start md:absolute md:left-5 md:bottom-0">
                    <p>
                      {answer.user.name} •{" "}
                      {formatRelativeTime(answer.createdAt)}
                    </p>
                  </span>
                  {/* <hr className="mt-3 -mb-3" /> */}
                </div>
              ))}
            </div>
            {/* Responder */}
            <div className="space-y-4">
              <Textarea
                className="p-5 mx-auto md:text-[1.1rem]! "
                placeholder="Escreva sua resposta..."
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
              />
              <Button
                size="lg"
                className="text-[1rem] cursor-pointer font-bold md:text-[1.4rem] md:p-6 md:min-w-75"
                onClick={handleSubmitAnswer}
              >
                {loading ? "Enviando..." : "Responder"}
              </Button>
            </div>
          </CardContent>
        )}
      </Card>
    </>
  );
}
