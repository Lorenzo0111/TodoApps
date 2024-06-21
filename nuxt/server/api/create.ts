import { prisma } from "~/prisma/db";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  if (!body.title)
    return Response.json({ error: "Missing title" }, { status: 400 });

  const todo = await prisma.todo.create({
    data: { title: body.title },
  });

  return todo;
});
