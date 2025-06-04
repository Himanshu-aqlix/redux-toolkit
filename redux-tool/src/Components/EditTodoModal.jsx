import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { addtodo, edittodo } from '../features/todoSlice';

export default function EditTodoModal({ editdata, setModalOpen, modalOpen }) {
  const [taskName, setTaskName] = useState('');
  const [priority, setPriority] = useState('Low');
  const [status, setStatus] = useState('Todo');
  const [isEdit, setIsEdit] = useState(false);   
  const [editId, setEditId] = useState(null);    

  const dispatch = useDispatch();

  useEffect(() => {
    if (editdata) {
      setTaskName(editdata.text || '');
      setPriority(editdata.priority || 'Low');
      setStatus(editdata.status || 'Todo');
      setEditId(editdata.id || null);
      setIsEdit(true);
    } else {
      setTaskName('');
      setPriority('Low');
      setStatus('Todo');
      setEditId(null);
      setIsEdit(false);
    }
  }, [editdata]);

  const handleAddTodo = (e) => {
    e.preventDefault();
    const payload = { id: editId, text: taskName, priority, status };

    if (isEdit) {
      dispatch(edittodo(payload));  
    } else {
      dispatch(addtodo(payload));    
    }

    // Reset state
    setTaskName('');
    setPriority('Low');
    setStatus('Todo');
    setEditId(null);
    setIsEdit(false);
    setModalOpen(false);
  };

  return (
    <>
      {modalOpen && (
        <div className="modal">
          <form onSubmit={handleAddTodo} className="modal-content">
            <h2 style={{ color: 'black' }}>{isEdit ? 'Edit Task' : 'Add New Task'}</h2>

            <label style={{ color: 'black' }}>Task Name:</label>
            <input
              type="text"
              value={taskName}
              onChange={(e) => setTaskName(e.target.value)}
              required
            />

            <label style={{ color: 'black' }}>Priority:</label>
            <select value={priority} onChange={(e) => setPriority(e.target.value)}>
              <option value="Low">🟢 Low</option>
              <option value="Medium">🟡 Medium</option>
              <option value="High">🔴 High</option>
            </select>

            <label style={{ color: 'black' }}>Status:</label>
            <div className="status-options">
              {['Todo', 'InProgress', 'Complete', 'Invalid'].map((opt) => (
                <label key={opt}>
                  <input
                    type="checkbox"
                    checked={status === opt}
                    onChange={() => setStatus(opt)}
                  />
                  {opt}
                </label>
              ))}
            </div>

            <div className="modal-buttons">
              <button type="submit">{isEdit ? 'Update Task' : 'Add Task'}</button>
              <button type="button" onClick={() => setModalOpen(false)}>Cancel</button>
            </div>
          </form>
        </div>
      )}
    </>
  );
}
