import { api } from "@/src/services/api";
import { User } from "@/src/types";
import { cookies } from "next/headers";
import Image from "next/image";
import logo from "../../../assets/images/logo.png";

export default async function Home() {
  const cookieStore = cookies();
  const token = (await cookieStore).get("access_token")?.value;
  const user = await api<User>("/user/me", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return (
    <div className="hub">
      <header className="space-y-1">
        <h1 className="text-3xl">Olá, {user.name} 🤗</h1>
        <p className="text-xl">Bem vindo ao YourForum</p>
      </header>
      <Image src={logo} width={150} height={150} alt="YourForum Logo" />
      <div className="flex flex-col space-y-3">
        <button>Perguntas</button>
        <button>Fazer uma pergunta</button>
      </div>
    </div>
  );
}
