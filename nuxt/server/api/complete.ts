import { getServerSession } from "#auth";
import { prisma } from "~/prisma/db";

export default defineEventHandler(async (event) => {
  const session = await getServerSession(event);
  if (!session || !session.user)
    return Response.json({ error: "Unauthorized" }, { status: 401 });

  const body = await readBody(event);
  const query = getQuery(event);

  if (!query.id)
    return Response.json({ error: "No ID provided" }, { status: 400 });

  const todo = await prisma.todo.update({
    where: { id: query.id as string, userEmail: session.user.email! },
    data: { done: body.done === true },
  });

  return todo;
});
