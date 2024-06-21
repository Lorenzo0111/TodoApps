import { getServerSession } from "#auth";
import { prisma } from "~/prisma/db";

export default defineEventHandler(async (event) => {
  const session = await getServerSession(event);
  if (!session || !session.user)
    return Response.json({ error: "Unauthorized" }, { status: 401 });

  const todos = await prisma.todo.findMany({
    where: { userEmail: session.user.email! },
  });

  return todos;
});
