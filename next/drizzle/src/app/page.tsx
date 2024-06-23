import Login from "@/components/Login";
import Logout from "@/components/Logout";
import Todo from "@/components/Todo";
import { db } from "@/drizzle";
import { todos } from "@/drizzle/schema";
import { auth } from "@/lib/auth";
import { asc, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export default async function Home() {
  const session = await auth();

  if (!session?.user) return <Login />;

  const data = await db.query.todos.findMany({
    where: eq(todos.userId, session.user.id),
    orderBy: [asc(todos.createdAt)],
  });

  return (
    <div className="flex min-h-screen flex-col justify-center items-center w-full">
      <div className="xl:rounded-xl xl:border w-full xl:w-1/3 p-4">
        <div className="flex justify-between items-center w-full">
          <h1 className="text-3xl font-bold">
            ToDo App
            <span className="font-light text-lg">({session.user.name})</span>
          </h1>
          <Logout />
        </div>

        <div className="w-full mt-5">
          {data.map((todo) => (
            <Todo todo={todo} key={todo.id} />
          ))}

          <form
            action={async (data) => {
              "use server";

              const session = await auth();
              if (!session?.user?.id) return;

              const title = data.get("title");
              if (!title || typeof title !== "string") return;

              await db.insert(todos).values({
                title,
                userId: session.user.id,
              });

              revalidatePath("/", "page");
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
