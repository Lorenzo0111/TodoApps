import Todo from "@/components/Todo";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export default async function Home() {
  const todos = await prisma.todo.findMany();

  return (
    <div className="flex min-h-screen flex-col justify-center items-center w-full">
      <div className="xl:rounded-xl xl:border w-full xl:w-1/3 p-4">
        <h1 className="text-3xl font-bold">ToDo App</h1>

        <div className="w-full mt-5">
          {todos.map((todo) => (
            <Todo todo={todo} key={todo.id} />
          ))}

          <form
            action={async (data) => {
              "use server";

              const title = data.get("title");
              if (!title || typeof title !== "string") return;

              await prisma.todo.create({
                data: {
                  title,
                },
              });

              revalidatePath("/");
            }}
          >
            <input
              className="mt-2 h-10 border border-gray-400 rounded-lg p-2 w-full"
              type="text"
              placeholder="Add a new todo"
              name="title"
            />
          </form>
        </div>
      </div>
    </div>
  );
}
