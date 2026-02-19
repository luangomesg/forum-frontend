import {} from "@/components/ui/card";
import { QuestionsList } from "@/src/components/QuestionList";
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
      credentials: "include",
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
      <QuestionsList questions={questions} />
    </div>
  );
}
