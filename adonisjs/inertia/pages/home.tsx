import type Todo from '#models/todo'
import { Head } from '@inertiajs/react'
import axios from 'axios'
import { useState } from 'react'
import useSWR from 'swr'

export default function Home() {
  const [title, setTitle] = useState('')
  const { data, mutate } = useSWR<Todo[] | null>('/todos', async (url: string) =>
    axios.get(url).then((res) => res.data)
  )

  return (
    <div className="xl:rounded-xl xl:border w-full xl:w-1/3 p-4">
      <Head title="Homepage" />

      <h1 className="text-3xl font-bold">ToDo App</h1>

      <div className="w-full mt-5">
        {data?.map((todo) => (
          <div key={todo.id} className="flex flex-row gap-1 items-center p-1">
            <input
              defaultChecked={todo.done}
              type="checkbox"
              onChange={() => {
                axios.patch(`/todos?id=${todo.id}`, { done: !todo.done }).then(() => mutate(null))
              }}
            />
            <p className={todo.done ? 'line-through' : ''}>{todo.title}</p>
          </div>
        ))}

        <form
          onSubmit={(e) => {
            e.preventDefault()
            axios.post('/todos', { title }).then(() => mutate(null))
          }}
        >
          <input
            type="text"
            name="title"
            placeholder="Title"
            className="mt-2 h-10 border border-gray-400 rounded-lg p-2 w-full"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </form>
      </div>
    </div>
  )
}
