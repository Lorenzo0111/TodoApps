<script setup lang="ts">
const props = defineProps(["id", "title", "done"]);

async function checkTodo(event: Event) {
  await fetch("/api/complete?id=" + props.id, {
    method: "POST",
    body: JSON.stringify({
      done: (event.target as HTMLInputElement).checked,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  location.reload();
}
</script>

<template>
  <div class="flex flex-row gap-1 items-center p-1">
    <input :checked="props.done" type="checkbox" @change="checkTodo" />
    <p :class="{ 'line-through': $props.done }">{{ $props.title }}</p>
  </div>
</template>
