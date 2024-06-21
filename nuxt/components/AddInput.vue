<script setup lang="ts">
const props = defineProps(["refresh"]);
const title = ref("");

async function addTodo() {
  await $fetch("/api/create", {
    method: "POST",
    body: {
      title: title.value,
    },
  });

  title.value = "";
  props.refresh();
}
</script>

<template>
  <form @submit.prevent="addTodo">
    <input
      class="mt-2 h-10 border border-gray-400 rounded-lg p-2 w-full"
      type="text"
      v-model="title"
      placeholder="Add a new todo"
    />
  </form>
</template>
