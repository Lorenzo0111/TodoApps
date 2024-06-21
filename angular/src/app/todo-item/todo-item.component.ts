import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Todo } from '../todo.model';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
})
export class TodoItemComponent {
  @Input() todo!: Todo;

  @Output() toggle = new EventEmitter<void>();

  toggleCompletion() {
    this.toggle.emit();
  }
}
