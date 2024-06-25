<?php

namespace App\Livewire;

use Livewire\Component;
use App\Models\Todo;

class TodoList extends Component
{
    public $todos;
    public $newTodo = '';


    public function mount()
    {
        $this->todos = Todo::all();
    }

    public function addTodo()
    {
        Todo::create(['title' => $this->newTodo]);
        $this->todos = Todo::all();
        $this->newTodo = '';
    }

    public function checkTodo($id)
    {
        $todo = Todo::find($id);
        $todo->completed = !$todo->completed;
        $todo->save();
        $this->todos = Todo::all();
    }

    public function render()
    {
        return view('livewire.todo-list');
    }
}