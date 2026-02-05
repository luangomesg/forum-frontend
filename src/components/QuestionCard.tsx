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
    <>
      <Card
        className="Card transition hover:bg-background/30 mb-6 border-primary"
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
            <h1 className="text-[1.1rem] mx-auto font-bold text-foreground border border-ring mt-3 p-3 rounded-md md:text-[1.4rem] lg:text-[1.6rem] lg:w-[80%]">
              {question.body}
            </h1>
            {question.answers.length === 0 ? (
              <span className="text-[1.2rem] md:text-[1.4rem] lg:text-[1.6rem]">
                Ainda sem respostas...
              </span>
            ) : (
              <span className="text-[1.2rem] md:text-[1.4rem] lg:text-[1.6rem]">
                Respostas:
              </span>
            )}
            {/* Respostas */}
            <div className="space-y-3 mt-2">
              {question.answers.map((answer) => (
                <div key={answer.id} className="rounded-md p-3 ">
                  <p className="text-sm mx-auto font-normal md:text-[1.1rem] lg:text-[1.3rem] lg:w-[80%]">
                    {answer.body}
                  </p>
                  <span className="text-xs text-muted-foreground md:text-[1rem]">
                    {answer.user.name} • {formatRelativeTime(answer.createdAt)}
                  </span>
                  <hr className="mt-3 -mb-3" />
                </div>
              ))}
            </div>
            {/* Responder */}
            <div className="space-y-4">
              <Textarea
                className="p-5 mx-auto md:text-[1.1rem]! lg:w-[80%]"
                placeholder="Escreva sua resposta..."
              />
              <Button
                size="lg"
                className="text-[1rem] cursor-pointer font-bold md:text-[1.4rem]"
              >
                Responder
              </Button>
            </div>
          </CardContent>
        )}
      </Card>
    </>
  );
}
