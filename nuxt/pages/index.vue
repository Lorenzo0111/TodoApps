<script setup lang="ts">
import type { Todo } from "@prisma/client";

const { data: todos } = await useFetch<Todo[]>("/api/list");
</script>

<template>
  <div>
    <h1>Welcome to the homepage</h1>
    <Todo
      v-for="todo in todos"
      :key="todo.id"
      :id="todo.id"
      :title="todo.title"
      :done="todo.done"
    />
  </div>
</template>
