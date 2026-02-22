import {} from "@/components/ui/card";
import { QuestionsList } from "@/src/components/QuestionList";
import { api } from "@/src/services/api";
import { Question, User } from "@/src/types";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function QuestionsPage() {
  const cookieStore = cookies();
  const token = (await cookieStore).get("access_token")?.value;
  let questions: Question[];
  let user: User;
  if (!token) redirect("/");

  try {
    user = await api<User>("/user/me", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
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
      <QuestionsList questions={questions} currentUser={user} />
    </div>
  );
}
