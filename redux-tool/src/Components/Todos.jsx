import React from 'react'

import {useSelector,useDispatch} from 'react-redux'
import { removetodo } from '../features/todoSlice';
export default function Todos() {
    const todos=useSelector(state=>state.todos)
    const dispatch=useDispatch()
  return (
    <div>
      <h1>Todos</h1>
      {todos.map((todo)=>(
        <li key={todo.id}>
            {todo.text}
            <button>
                onclick={()=>dispatch(removetodo(todo.id))}
            </button>

        </li>
      ))}
    </div>
  )
}

