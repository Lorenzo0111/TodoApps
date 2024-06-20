import prisma from "@/lib/prisma";

export async function GET(request: Request) {
  const todos = await prisma.todo.findMany();
  return Response.json(todos);
}
