import { api } from "@/src/services/api";
import { User } from "@/src/types";
import { cookies } from "next/headers";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import logo from "../../../assets/images/logo.png";
import logoLg from "../../../assets/images/yourforum-logo.svg";

export default async function Home() {
  const cookieStore = cookies();
  const token = (await cookieStore).get("access_token")?.value;

  if (!token) redirect("/");

  let user: User;

  try {
    user = await api<User>("/user/me", {
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
    <div className="hub">
      <header className="space-y-1">
        <h1 className="text-3xl md:text-6xl">Olá, {user.name} 🤗</h1>
        <p className="text-xl md:text-2xl">Bem vindo ao YourForum</p>
      </header>
      <Image
        src={logo}
        alt="YourForum Logo"
        className="w-40 md:w-60 drop-shadow-lg lg:hidden"
        priority
      />

      <Image
        src={logoLg}
        alt="YourForum Logo"
        className="hidden lg:block drop-shadow-lg lg:col-start-1 lg:mx-auto lg:w-[60%]"
        priority
      />

      <div className="flex flex-col space-y-3 md:space-y-4 lg:col-start-2 lg:mx-auto lg:mb-auto lg:-mt-10">
        <Link href="/questions/new">
          <button>Fazer uma pergunta</button>
        </Link>

        <Link href="/questions">
          <button>Perguntas</button>
        </Link>
      </div>
    </div>
  );
}
