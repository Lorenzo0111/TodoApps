import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { TodoComponent } from './todo.component';
import { TodoFormModule } from '../todo-form/todo-form.module';
import { TodoFormComponent } from '../todo-form/todo-form.component';

const routes: Routes = [
  { path: '', component: TodoComponent },
  { path: 'add', component: TodoFormComponent },
];

@NgModule({
  declarations: [TodoComponent, TodoFormComponent],
  imports: [CommonModule, TodoFormModule, RouterModule.forChild(routes)],
})
export class TodoModule {}
