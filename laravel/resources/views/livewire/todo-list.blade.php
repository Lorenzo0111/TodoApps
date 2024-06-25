<div class="xl:rounded-xl xl:border w-full xl:w-1/3 p-4">
    <h1 class="text-3xl font-bold">
        ToDo App
    </h1>

    <div class="w-full mt-5">

        @foreach ($todos as $todo)
        <div class="flex flex-row gap-1 items-center p-1">
            <input 
            {{ $todo->completed ? 'checked' : '' }}
             type="checkbox" 
             wire:change="checkTodo({{ $todo->id }})"
             />
            <p>{{ $todo->title }}</p>
        </div>
        @endforeach

        <form wire:submit.prevent="addTodo">
            <input wire:model="newTodo" type="text" placeholder="Create a new todo"
            class="mt-2 h-10 border border-gray-400 rounded-lg p-2 w-full"
            />
        </form>

    </div>

</div>