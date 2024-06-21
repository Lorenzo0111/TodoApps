import { getServerSession } from "#auth";
import { prisma } from "~/prisma/db";

export default defineEventHandler(async (event) => {
  const session = await getServerSession(event);
  if (!session || !session.user)
    return Response.json({ error: "Unauthorized" }, { status: 401 });

  const body = await readBody(event);

  if (!body.title)
    return Response.json({ error: "Missing title" }, { status: 400 });

  const todo = await prisma.todo.create({
    data: { title: body.title, userEmail: session.user.email! },
  });

  return todo;
});
