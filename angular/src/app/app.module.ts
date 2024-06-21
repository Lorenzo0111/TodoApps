import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module'; // <-- Import the AppRoutingModule

import { AppComponent } from './app.component';
import { TodoComponent } from './todo/todo.component';
import { TodoItemComponent } from './todo-item/todo-item.component';

@NgModule({
  declarations: [AppComponent, TodoComponent, TodoItemComponent],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule, // <-- Add the AppRoutingModule to imports array
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
