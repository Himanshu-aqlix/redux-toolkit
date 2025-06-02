import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removetodo } from '../features/todoSlice';


export default function Todos() {
  const todos = useSelector((state) => state.todo.todos); // Adjust if needed
  const dispatch = useDispatch();

  function edittask(){

  }

  return (
    <div>
      <h1>Todos</h1>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            {todo.text}<button onClick={() => dispatch(removetodo(todo.id))}>delete</button>
             <button  onclick={edittask}>Edit</button>
          </li>

        ))}
      </ul>
    </div>
  );
}
