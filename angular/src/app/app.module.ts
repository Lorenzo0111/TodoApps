import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { TodoFormModule } from './todo-form/todo-form.module';
import { TodoModule } from './todo/todo.module';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, FormsModule, TodoFormModule, TodoModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
