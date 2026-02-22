"use client";

import { useMemo, useState } from "react";
import { Input } from "@/components/ui/input";
import { QuestionCard } from "@/src/components/QuestionCard";
import { Question, User } from "@/src/types";
import Link from "next/link";
import Image from "next/image";
import backArrow from "../assets/icons/icons8-voltar-64.png";

interface Props {
  questions: Question[];
  currentUser: User;
}

export function QuestionsList({ questions, currentUser }: Props) {
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
      <div className="flex flex-row-reverse w-[80%] absolute top-0 items-center justify-center mt-2 lg:mt-4 lg:w-[70%] gap-3 md:gap-5 lg:gap-5">
        <Input
          placeholder="Buscar perguntas..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className=" w-[80%] "
        />
        <Link href="/hub" className="flex lg:text-center">
          <button className="btn-back-hub-two">
            <Image src={backArrow} alt="icone para voltar ao hub" />
          </button>
        </Link>
      </div>

      <div className="flex flex-col w-full justify-center items-center lg:grid lg:grid-cols-3 lg:w-[80%]">
        {filteredQuestions.length === 0 ? (
          <p className="text-muted-foreground text-lg lg:col-start-2">
            Nenhuma pergunta encontrada 😕
          </p>
        ) : (
          filteredQuestions.map((question) => (
            <QuestionCard
              key={question.id}
              question={question}
              currentUser={currentUser}
            />
          ))
        )}
      </div>
    </>
  );
}
