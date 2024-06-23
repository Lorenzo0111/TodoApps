"use client";

export default function Todo({
  todo,
}: {
  todo: {
    id: number;
    title: string;
    done: boolean;
  };
}) {
  return (
    <div className="flex flex-row gap-1 items-center p-1">
      <input
        type="checkbox"
        checked={todo.done}
        onChange={() => {
          const formData = new FormData();
          formData.append("done", (!todo.done).toString());

          fetch(`/api/complete?id=${todo.id}`, {
            method: "PATCH",
            body: formData,
          }).then(() => {
            location.reload();
          });
        }}
      />
      <p className={todo.done ? "line-through" : ""}>{todo.title}</p>
    </div>
  );
}
