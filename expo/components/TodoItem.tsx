import type { Todo } from "@prisma/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Checkbox from "expo-checkbox";
import { Text, View } from "./Themed";

export default function TodoItem({ todo }: { todo: Todo }) {
  const queryClient = useQueryClient();
  const mutate = useMutation({
    mutationKey: ["todo", todo.title],
    mutationFn: ({ id, done }: { id: string; done: boolean }) =>
      fetch(`/api/complete?id=${id}`, {
        method: "POST",
        body: JSON.stringify({ done }),
      }),
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: ["todo"],
      }),
  });

  return (
    <View className="flex-1 flex-row gap-1 items-center p-1">
      <Checkbox
        value={todo.done}
        onValueChange={(value) => {
          mutate.mutate({ id: todo.id, done: value });
        }}
        color={todo.done ? "#4630EB" : undefined}
      />
      <Text className={todo.done ? "line-through" : ""}>{todo.title}</Text>
    </View>
  );
}
