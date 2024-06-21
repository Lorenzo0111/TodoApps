<script setup lang="ts">
import type { Todo } from "@prisma/client";

const { data: todos, refresh } = await useFetch<Todo[]>("/api/list");
</script>

<template>
  <div class="xl:rounded-xl xl:border w-full xl:w-1/3 p-4">
    <h1 class="text-3xl font-bold">ToDo App</h1>
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
