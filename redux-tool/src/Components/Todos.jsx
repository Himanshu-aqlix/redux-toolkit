import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { edittodo, removetodo } from '../features/todoSlice';

export default function Todos() {
  const todos = useSelector((state) => state.todo.todos);
  const dispatch = useDispatch();

  

  return (
    <div>
      <h1>Todos</h1>
      <table  className="table" border="1" cellPadding="10" cellSpacing="0" >
        <thead>
          <tr>
            <th>Task Name</th>
            <th>Priority</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {todos.map((todo) => (
            <tr key={todo.id}>
              <td>{todo.text}</td>
              <td>{todo.priority}</td>
              <td>{todo.status}</td>
              <td>
                <button onClick={() => dispatch(removetodo(todo.id))}>Delete</button>
                <button onClick={() => dispatch(edittodo(todo.id))}>Edit</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
