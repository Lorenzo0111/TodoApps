import {
  type LoaderFunction,
  type ActionFunction,
  json,
} from "@remix-run/node";
import { prisma } from "../../prisma/db";
import { Todo } from "@prisma/client";
import { Form, useLoaderData } from "@remix-run/react";
import { useEffect, useRef } from "react";

export const loader: LoaderFunction = async () => {
  const todos: Todo[] = await prisma.todo.findMany();
  return todos;
};

export const action: ActionFunction = async ({ request }) => {
  if (request.method !== "POST") return null;

  const data = await request.formData();

  if (data.has("title")) {
    const title = data.get("title");

    if (!title || typeof title !== "string")
      return json({ error: "Title must be defined" }, { status: 400 });

    const todo = await prisma.todo.create({
      data: { title },
    });

    return json(todo);
  }

  if (data.has("id")) {
    const id = data.get("id");
    const done = data.get("done");

    if (!id || typeof id !== "string")
      return json({ error: "Id must be defined" }, { status: 400 });

    const todo = await prisma.todo.update({
      where: {
        id,
      },
      data: { done: done === "on" },
    });

    if (!todo) {
      return json(
        { error: "Todo does not exist" },
        {
          status: 400,
        }
      );
    }

    return json(todo);
  }

  return null;
};

export default function Index() {
  const data = useLoaderData<Todo[]>();
  const form = useRef<HTMLFormElement>(null);

  useEffect(() => {
    form.current?.reset();
  }, [data]);

  return (
    <div className="xl:rounded-xl xl:border w-full xl:w-1/3 p-4">
      <h1 className="text-3xl font-bold">ToDo App</h1>

      <div className="w-full mt-5">
        {data.map((todo) => (
          <Form
            key={todo.id}
            method="post"
            className="flex flex-row gap-1 items-center p-1"
          >
            <input hidden name="id" defaultValue={todo.id} />
            <input
              onChange={(e) => {
                e.target.form?.submit();
              }}
              defaultChecked={todo.done}
              type="checkbox"
              name="done"
            />
            <p className={todo.done ? "line-through" : ""}>{todo.title}</p>
          </Form>
        ))}

        <Form method="post" ref={form}>
          <input
            name="title"
            type="text"
            className="mt-2 h-10 border border-gray-400 rounded-lg p-2 w-full"
          />
        </Form>
      </div>
    </div>
  );
}
