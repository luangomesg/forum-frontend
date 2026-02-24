import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(request: NextRequest, context: {params: Promise<{id: string}>}) {
    const {id} = await context.params
  const body = await request.json();
  const token = (await cookies()).get("access_token")?.value;

  if (!token) {
    return NextResponse.json(
      { message: "Token is required" },
      { status: 401 }
    );
  }

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/answers/${id}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    }
  );

  const data = await response.json();

  return NextResponse.json(data, { status: response.status });
}