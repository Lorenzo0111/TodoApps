import type { APIRoute } from "astro";
import { prisma } from "../../../prisma/db";

export const POST: APIRoute = async ({ params, request }) => {
  const body = await request.json();
  const id = new URL(request.url).searchParams.get("id");

  if (!id) {
    return Response.json({ error: "No ID provided" }, { status: 400 });
  }

  const todo = await prisma.todo.update({
    where: { id },
    data: { done: body.done === true },
  });

  return Response.json(todo);
};
