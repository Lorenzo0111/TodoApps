// import type { HttpContext } from '@adonisjs/core/http'

import Todo from '#models/todo'
import { HttpContext } from '@adonisjs/core/http'

export default class TodosController {
  async index() {
    const todos = await Todo.all()
    return todos
  }

  async store({ request }: HttpContext) {
    const todo = new Todo()
    todo.title = request.input('title')
    await todo.save()
    return todo
  }

  async update({ request }: HttpContext) {
    const id = new URL(request.completeUrl(true)).searchParams.get('id')
    if (!id) return null

    const todo = await Todo.find(id)
    if (!todo) return null

    todo.done = request.input('done')
    await todo.save()
    return todo
  }
}
