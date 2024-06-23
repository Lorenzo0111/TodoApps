import prisma from '$lib/prisma';
import type { Actions, PageServerLoad } from './$types';

export const load = (async () => {
	const todos = await prisma.todo.findMany();
	return { todos };
}) satisfies PageServerLoad;

export const actions = {
	add: async (event) => {
		console.log(event.request.method);

		const body = await event.request.formData();
		const title = body.get('title');

		if (!title || typeof title !== 'string') return;

		await prisma.todo.create({
			data: {
				title
			}
		});
	},
	complete: async (event) => {
		const id = new URL(event.request.url).searchParams.get('id');
		if (!id) return;

		const body = await event.request.formData();
		const done = body.get('done') === 'true';

		await prisma.todo.update({
			where: { id },
			data: { done }
		});
	}
} satisfies Actions;
