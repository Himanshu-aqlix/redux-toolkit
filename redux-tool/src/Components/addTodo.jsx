import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addtodo } from '../features/todoSlice';
// import './addTodo.css';

export default function Todos() {
  const [modalOpen, setModalOpen] = useState(false);
  const [taskName, setTaskName] = useState('');
  const [priority, setPriority] = useState('Low');
  const [status, setStatus] = useState('Todo');
  const dispatch = useDispatch();


  const handleAddTodo = (e) => {
    e.preventDefault();
     const newTodo = {
     text: taskName,
     priority,
     status,
      };

    dispatch(addtodo(newTodo));
    setTaskName('');
    setPriority('');
    setModalOpen(false);
    setStatus("");
  };

  return (
    <>
      <button className="addtodo  " onClick={() => setModalOpen(true)}>Add Todo</button>

      {modalOpen && (
        <div className="modal">
          <form onSubmit={handleAddTodo} className="modal-content">
            <h2 style={{color:'black'}}>Add New Task</h2>

            <label style={{color:'black'}}>Task Name:-</label>
            <input
               
              type="text"
              value={taskName}
              onChange={(e) => setTaskName(e.target.value)}
              required
            />

            <label style={{color:'black'}}>Priority:-</label>
            <select value={priority} onChange={(e) => setPriority(e.target.value)}>
              <option value="Low">🟢 Low</option>
             <option value="Medium">🟡 Medium</option>
             <option value="High">🔴 High</option>
            </select>
            
            <label style={{color:'black'}}>Status:-</label>
             <div className="status-options">
             <label >
             <input type="checkbox" checked={status === 'Todo'} onChange={() => setStatus('Todo')}   />
             Todo
            </label>

            <label>
            <input type="checkbox" checked={status === 'InProgress'} onChange={() => setStatus('InProgress')} />
             InProgress
            </label>

            <label>
            <input  type="checkbox" checked={status === 'Complete'} onChange={() => setStatus('Complete')}  />
             Complete
            </label>

            <label>
            <input type="checkbox" checked={status === 'Invalid'} onChange={() => setStatus('Invalid')}/>
            Invalid
            </label>
            </div>

           

            <div className="modal-buttons">
              <button type="submit">Add Task</button>
              <button type="button" onClick={() => setModalOpen(false)}>Cancel</button>
            </div>
          </form>
        </div>
      )}
    </>
  );
}
