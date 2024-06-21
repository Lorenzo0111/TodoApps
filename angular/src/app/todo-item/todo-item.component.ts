import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Todo } from '../todo.model';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.css'],
})
export class TodoItemComponent {
  @Input() todo!: Todo; // <-- Use definite assignment assertion

  @Output() toggle = new EventEmitter<void>();
  @Output() delete = new EventEmitter<void>();

  toggleCompletion() {
    this.toggle.emit();
  }

  deleteTodo() {
    console.log('delete');
    this.delete.emit();
  }
}
