import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {  removetodo } from '../features/todoSlice';
import EditTodoModal from './EditTodoModal';

export default function Todos() {
    const [modalOpen, setModalOpen] = useState(false);
    const[editdata,seteditdata]=useState();
  
  const todos = useSelector((state) => state.todo.todos);
  const dispatch = useDispatch();

  const onEditClick=(item)=>{
      seteditdata(item);
      setModalOpen(true);
  }

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
                <button onClick={() => onEditClick(todo)}>Edit</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <EditTodoModal
        modalOpen={modalOpen}
        editdata={editdata}
        setModalOpen={setModalOpen}
      />
    </div>
  );
}
