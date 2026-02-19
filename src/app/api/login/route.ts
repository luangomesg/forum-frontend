import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(request: Request) {
  const body = await request.json();

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/auth/signin`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    }
  );

  const data = await response.json();

  if (!response.ok) {
    return NextResponse.json(data, { status: response.status });
  }

  // 🔥 Criando cookie no domínio do frontend
  (await
        // 🔥 Criando cookie no domínio do frontend
        cookies()).set("access_token", data.access_token, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24,
  });

  return NextResponse.json({ success: true });
}
