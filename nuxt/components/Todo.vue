<script setup lang="ts">
const props = defineProps(["id", "title", "done"]);

async function checkTodo(event: Event) {
  await $fetch("/api/complete?id=" + props.id, {
    method: "POST",
    body: {
      done: (event.target as HTMLInputElement).checked,
    },
  });
}
</script>

<template>
  <div class="flex gap-2">
    <input :checked="props.done" type="checkbox" @change="checkTodo" />
    <p>{{ $props.title }}</p>
  </div>
</template>
