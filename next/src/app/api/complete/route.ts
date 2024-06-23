import { prisma } from "@/lib/prisma";
import { NextRequest } from "next/server";

export async function PATCH(req: NextRequest) {
  const id = req.nextUrl.searchParams.get("id");
  const body = await req.formData();
  const done = body.get("done") === "true";

  if (!id) return Response.json({ error: "No ID provided" }, { status: 400 });

  const todo = await prisma.todo.update({
    where: { id },
    data: { done },
  });

  return Response.json(todo);
}
