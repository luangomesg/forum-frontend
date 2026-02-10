"use client";

import { useMemo, useState } from "react";
import { Input } from "@/components/ui/input";
import { QuestionCard } from "@/src/components/QuestionCard";
import { Question } from "@/src/types";

interface Props {
  questions: Question[];
}

export function QuestionsList({ questions }: Props) {
  const [search, setSearch] = useState("");

  const filteredQuestions = useMemo(() => {
    const value = search.toLowerCase();

    if (!value) return questions;

    return questions.filter(
      (q) =>
        q.title.toLowerCase().includes(value) ||
        q.body.toLowerCase().includes(value) ||
        q.user.name.toLowerCase().includes(value),
    );
  }, [search, questions]);

  return (
    <>
      <Input
        placeholder="Buscar perguntas..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="mb-6 mt-2 absolute top-0 mx-auto w-[80%] md:text-lg md:w-[70%] lg:w-[50%] lg:mt-4"
      />
      <div className="flex flex-col w-full justify-center items-center lg:grid lg:grid-cols-3 lg:items-start">
        {filteredQuestions.length === 0 ? (
          <p className="text-muted-foreground text-lg">
            Nenhuma pergunta encontrada 😕
          </p>
        ) : (
          filteredQuestions.map((question) => (
            <QuestionCard key={question.id} question={question} />
          ))
        )}
      </div>
    </>
  );
}
