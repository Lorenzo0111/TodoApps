import { prisma } from "~/prisma/db";

export default defineEventHandler(async (event) => {
  const todos = await prisma.todo.findMany();
  return todos;
});
