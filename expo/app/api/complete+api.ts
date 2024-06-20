import prisma from "@/lib/prisma";

export async function POST(request: Request) {
  const id = new URL(request.url).searchParams.get("id");
  const body = await request.json();

  if (!id) {
    return Response.json({ error: "Missing id" }, { status: 400 });
  }

  const todo = await prisma.todo.update({
    where: { id },
    data: { done: body.done === true },
  });

  if (!todo) {
    return Response.json({ error: "Todo not found" }, { status: 404 });
  }

  return Response.json(todo);
}
