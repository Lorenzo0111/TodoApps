<script setup lang="ts">
import type { Todo } from "@prisma/client";

definePageMeta({ middleware: "auth" });

const { status, data, signIn, signOut } = useAuth();
const { data: todos, refresh } = await useFetch<Todo[]>("/api/list");
</script>

<template>
  <div class="xl:rounded-xl xl:border w-full xl:w-1/3 p-4">
    <div class="flex justify-between items-center w-full">
      <h1 class="text-3xl font-bold">
        ToDo App
        <span class="font-light text-lg">({{ data?.user?.name }})</span>
      </h1>
      <button @click="() => signOut()" class="bg-green-500 rounded-lg p-2">
        Sign Out
      </button>
    </div>
    <div class="w-full mt-5">
      <Todo
        v-for="todo in todos"
        :key="todo.id"
        :id="todo.id"
        :title="todo.title"
        :done="todo.done"
        :refresh="refresh"
      />
      <AddInput :refresh="refresh" />
    </div>
  </div>
</template>

<style>
body,
html,
#__nuxt {
  min-height: 100vh;
}

#__nuxt {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
}
</style>
