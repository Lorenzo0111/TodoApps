<script setup lang="ts">
const props = defineProps(["id", "title", "done", "refresh"]);

async function checkTodo(event: Event) {
  await $fetch("/api/complete?id=" + props.id, {
    method: "POST",
    body: {
      done: (event.target as HTMLInputElement).checked,
    },
  });

  props.refresh();
}
</script>

<template>
  <div class="flex flex-row gap-1 items-center p-1">
    <input :checked="props.done" type="checkbox" @change="checkTodo" />
    <p :class="{ 'line-through': $props.done }">{{ $props.title }}</p>
  </div>
</template>
