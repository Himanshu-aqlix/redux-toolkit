import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateTodo, setLoading, setError } from '../features/todoSlice';
import { taskAPI } from '../services/api';
import Modal from 'react-modal';

Modal.setAppElement('#root');

const modalStyles = {
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 1000
  },
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    border: 'none',
    borderRadius: '12px',
    padding: '0',
    maxWidth: '500px',
    width: '90%',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)'
  }
};

export default function EditTodoModal({ editdata, setModalOpen, modalOpen }) {
  const [taskName, setTaskName] = useState('');
  const [priority, setPriority] = useState('Low');
  const [status, setStatus] = useState('Todo');

  const dispatch = useDispatch();

  useEffect(() => {
    if (editdata) {
      setTaskName(editdata.text || '');
      setPriority(editdata.priority || 'Low');
      setStatus(editdata.status || 'Todo');
    }
  }, [editdata]);  const handleUpdateTodo = async (e) => {
    e.preventDefault();
    if (!taskName.trim()) return;

    const payload = { text: taskName, priority, status };

    try {
      dispatch(setLoading(true));
      const response = await taskAPI.updateTask(editdata._id, payload);
      dispatch(updateTodo(response.data));

      setTaskName('');
      setPriority('Low');
      setStatus('Todo');
      setModalOpen(false);
    } catch (error) {
      dispatch(setError(error.response?.data?.message || 'Failed to update task'));
    } finally {
      dispatch(setLoading(false));
    }
  };
  const statusOptions = [
    { value: 'Todo', label: 'Todo' },
    { value: 'InProgress', label: 'In Progress' },
    { value: 'Complete', label: 'Complete' },
    { value: 'Invalid', label: 'Invalid' }
  ];

  return (
    <Modal
      isOpen={modalOpen}
      onRequestClose={() => setModalOpen(false)}
      style={modalStyles}
      contentLabel="Edit Task Modal"
    >
      <div className="modal-header">
        <h2 className="modal-title">Edit Task</h2>
        <button 
          className="modal-close" 
          onClick={() => setModalOpen(false)}
          type="button"
        >
          ×
        </button>
      </div>

      <form onSubmit={handleUpdateTodo}>        <div className="modal-body">
          <div className="form-group">
            <label className="form-label">Task Name</label>
            <input
              type="text"
              className="form-control"
              value={taskName}
              onChange={(e) => setTaskName(e.target.value)}
              placeholder="Enter task description..."
              required
              disabled
              style={{ backgroundColor: '#f8f9fa', cursor: 'not-allowed' }}
            />
            <small className="text-muted">Task name cannot be edited</small>
          </div>

          <div className="form-group">
            <label className="form-label">Priority</label>
             <select 
              className="form-select" 
              value={priority} 
              onChange={(e) => setPriority(e.target.value)}
            >
              <option value="Low">Low Priority</option>
              <option value="Medium">Medium Priority</option>
              <option value="High">High Priority</option>
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">Status</label>
            <div className="status-options">
              {statusOptions.map((option) => (
                <div 
                  key={option.value}
                  className={`status-option ${status === option.value ? 'selected' : ''}`}
                  onClick={() => setStatus(option.value)}
                >
                  <input
                    type="radio"
                    name="status"
                    value={option.value}
                    checked={status === option.value}
                    onChange={() => setStatus(option.value)}
                  />                    <label>{option.label}</label>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="modal-footer">
          <button 
            type="button" 
            className="btn-secondary" 
            onClick={() => setModalOpen(false)}
          >
            Cancel
          </button>
          <button type="submit" className="btn-primary">
            Update Task
          </button>
        </div>
      </form>
    </Modal>
  );
}
