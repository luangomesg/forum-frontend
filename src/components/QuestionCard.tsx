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

interface Props {
  question: Question;
}

export function QuestionCard({ question }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <Card
      className="Card transition hover:bg-background/30 cursor-pointer"
      onClick={() => setOpen((prev) => !prev)}
    >
      <CardHeader>
        <CardTitle>{question.title}</CardTitle>
        <CardDescription>
          {question.answers.length == 1
            ? "1 resposta"
            : `${question.answers.length} respostas`}{" "}
          • {formatRelativeTime(question.createdAt)}
        </CardDescription>
      </CardHeader>

      <CardContent className="flex gap-2 mx-auto">
        <Badge>Criador: {question.user.name}</Badge>
      </CardContent>

      {open && (
        <CardContent
          className="space-y-4 border-t"
          onClick={(e) => e.stopPropagation()} // evita fechar ao clicar dentro
        >
          {/* Pergunta */}
          <p className="text-sm text-muted-foreground">{question.body}</p>

          {/* Respostas */}
          <div className="space-y-3">
            {question.answers.map((answer) => (
              <div key={answer.id} className="rounded-md border p-3">
                <p className="text-sm">{answer.body}</p>
                <span className="text-xs text-muted-foreground">
                  {answer.user.name} • {formatRelativeTime(answer.createdAt)}
                </span>
              </div>
            ))}
          </div>

          {/* Responder */}
          <div className="space-y-2">
            <Textarea placeholder="Escreva sua resposta..." />
            <Button size="sm">Responder</Button>
          </div>
        </CardContent>
      )}
    </Card>
  );
}
