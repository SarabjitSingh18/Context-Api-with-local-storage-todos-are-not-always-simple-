import React, { useEffect, useState } from 'react'
import { TodoProvider } from './contexts'
import { TodoForm, TodoItem } from './components'

function App() {
  const [todos, setTodos] = useState([])
  // add functionality
  const addTodo = (todo) => {
    setTodos((prev) => [{ id: Date.now(), ...todo }, ...prev])
  }
  //update functionality
  const updateTodo = (id, todo) => {
    setTodos((prev) => prev.map((prevTodo) => (prevTodo.id === id ? todo : prevTodo)))
  }
  //delete functionality
  const deleteTodo = (id) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id))
  }

  //toggleing the todo 
  const toggleComplete = (id) => {
    setTodos((prev) => prev.map((prevTodo) => prevTodo.id === id ? { ...prevTodo, completed: !prevTodo.completed } : prevTodo))
  }

  useEffect(()=>{
    const todos = JSON.parse(localStorage.getItem('todos'))
    if (todos && todos.length>0) {
      setTodos(todos)

    }
  },[])

  useEffect(()=>{
    localStorage.setItem('todos',JSON.stringify(todos))

  },[todos])

  return (
    <TodoProvider value={{ todos, addTodo, deleteTodo, updateTodo, toggleComplete }}>
      <div>
        <div className="bg-[#172842] min-h-screen py-8">
          <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white">
            <h1 className="text-2xl font-bold text-center mb-8 mt-2">Manage Your Todos</h1>
            <div className="mb-4">
              <TodoForm/>


            </div>
            <div className="flex flex-wrap gap-y-3">
              {
                todos.map((todo)=>(
                  <div key={todo.id} className="w-full">
                    <TodoItem todo={todo}/>

                  </div>
                ))
              }


            </div>
          </div>
        </div>

      </div>

    </TodoProvider>

  )
}

export default App
