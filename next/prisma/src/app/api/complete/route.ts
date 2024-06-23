import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export const PATCH = auth(async (req) => {
  if (!req.auth?.user.id)
    return Response.json({ error: "Unauthorized" }, { status: 401 });

  const id = req.nextUrl.searchParams.get("id");
  const body = await req.formData();
  const done = body.get("done") === "true";

  if (!id) return Response.json({ error: "No ID provided" }, { status: 400 });

  const todo = await prisma.todo.update({
    where: { id, userId: req.auth.user.id },
    data: { done },
  });

  return Response.json(todo);
});
