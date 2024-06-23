import { db } from "@/drizzle";
import { todos } from "@/drizzle/schema";
import { auth } from "@/lib/auth";
import { and, eq } from "drizzle-orm";

export const PATCH = auth(async (req) => {
  if (!req.auth?.user.id)
    return Response.json({ error: "Unauthorized" }, { status: 401 });

  const id = req.nextUrl.searchParams.get("id");
  const body = await req.formData();
  const done = body.get("done") === "true";

  if (!id) return Response.json({ error: "No ID provided" }, { status: 400 });

  const todo = await db
    .update(todos)
    .set({ done })
    .where(and(eq(todos.id, parseInt(id)), eq(todos.userId, req.auth.user.id)));

  return Response.json(todo);
});
