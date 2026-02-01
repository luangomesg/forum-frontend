import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { formatRelativeTime } from "@/lib/utils";
import { QuestionCard } from "@/src/components/QuestionCard";
import { api } from "@/src/services/api";
import { Question } from "@/src/types";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function QuestionsPage() {
  const cookieStore = cookies();
  const token = (await cookieStore).get("access_token")?.value;
  let questions: Question[];
  if (!token) redirect("/");
  try {
    questions = await api<Question[]>("/questions", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    redirect("/");
  }
  return (
    <div className="questions">
      {questions.map((question) => (
        <QuestionCard key={question.id} question={question} />
      ))}
    </div>
  );
}
