<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<div class="flex min-h-screen flex-col justify-center items-center w-full">
	<div class="xl:rounded-xl xl:border w-full xl:w-1/3 p-4">
		<h1 class="text-3xl font-bold">ToDo App</h1>

		<div class="w-full mt-5">
			{#each data.todos as todo}
				<div class="flex flex-row gap-1 items-center p-1">
					<input
						type="checkbox"
						checked={todo.done}
						on:change={() => {
							const formData = new FormData();
							formData.append('done', (!todo.done).toString());

							fetch(`/?/complete&id=${todo.id}`, {
								method: 'POST',
								body: formData
							}).then(() => {
								todo.done = !todo.done;
							});
						}}
					/>
					<p class={todo.done ? 'line-through' : ''}>{todo.title}</p>
				</div>
			{/each}

			<form method="POST" action="?/add">
				<input
					class="mt-2 h-10 border border-gray-400 rounded-lg p-2 w-full"
					type="text"
					placeholder="Add a new todo"
					name="title"
				/>
			</form>
		</div>
	</div>
</div>
