import { Injectable } from '@angular/core';
import { Todo } from './todo.model';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private todos: Todo[] = [
    { id: 1, title: 'Learn Angular', completed: false },
    { id: 2, title: 'Build a Todo App', completed: false },
  ];

  constructor() {}

  getTodos() {
    return this.todos;
  }

  addTodo(title: string) {
    const newTodo: Todo = {
      id: this.todos.length + 1,
      title: title,
      completed: false,
    };
    this.todos.push(newTodo);
  }

  toggleTodoCompletion(id: number) {
    const todo = this.todos.find((todo) => todo.id === id);
    if (todo) {
      todo.completed = !todo.completed;
    }
  }

  deleteTodo(id: number) {
    this.todos = this.todos.filter((todo) => todo.id !== id);
  }
}
