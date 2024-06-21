import { Injectable } from '@angular/core';
import { Todo } from './todo.model';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private todos: Todo[] = [];
  private storageKey = 'todos';

  constructor() {
    this.loadTodos();
  }

  private loadTodos(): void {
    const savedTodos = localStorage.getItem(this.storageKey);
    if (savedTodos) {
      this.todos = JSON.parse(savedTodos);
    }
  }

  private saveTodos(): void {
    localStorage.setItem(this.storageKey, JSON.stringify(this.todos));
  }

  getTodos(): Todo[] {
    return this.todos;
  }

  addTodo(title: string): void {
    const newTodo: Todo = {
      id: this.todos.length ? this.todos[this.todos.length - 1].id + 1 : 1,
      title: title,
      completed: false,
    };
    this.todos.push(newTodo);
    this.saveTodos();
  }

  toggleTodoCompletion(id: number): void {
    const todo = this.todos.find((todo) => todo.id === id);
    if (todo) {
      todo.completed = !todo.completed;
      this.saveTodos();
    }
  }
}
