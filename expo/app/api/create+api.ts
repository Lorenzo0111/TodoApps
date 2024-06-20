import prisma from "@/lib/prisma";

export async function POST(request: Request) {
  const body = await request.json();

  if (!body.title) {
    return Response.json({ error: "Missing title" }, { status: 400 });
  }

  const todo = await prisma.todo.create({
    data: { title: body.title },
  });

  return Response.json(todo);
}
