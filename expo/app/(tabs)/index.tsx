import { Text, View } from "@/components/Themed";
import TodoItem from "@/components/TodoItem";
import type { Todo } from "@prisma/client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { TextInput } from "react-native";

export default function HomeScreen() {
  const queryClient = useQueryClient();
  const { data } = useQuery<Todo[]>({
    queryKey: ["todo"],
    queryFn: () => fetch("/api/list").then((res) => res.json()),
  });
  const mutate = useMutation({
    mutationKey: ["todo"],
    mutationFn: (title: string) =>
      fetch("/api/create", {
        method: "POST",
        body: JSON.stringify({ title }),
        headers: {
          "Content-Type": "application/json",
        },
      }),
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: ["todo"],
      }),
  });

  return (
    <View className="flex-1 items-center h-full justify-center">
      <View className="xl:rounded-xl xl:border w-full xl:w-1/3 p-4">
        <Text className="text-3xl font-bold">ToDo App</Text>
        <View className="w-full mt-5">
          {data?.map((todo) => (
            <TodoItem key={todo.id} todo={todo} />
          ))}
          <TextInput
            onSubmitEditing={(e) => {
              mutate.mutate(e.nativeEvent.text);
              (e.currentTarget as TextInput).clear();
              (e.currentTarget as TextInput).blur();
            }}
            className="mt-2 h-10 border border-gray-400 rounded-lg p-2"
            placeholder="Add a new todo"
          />
        </View>
      </View>
    </View>
  );
}
