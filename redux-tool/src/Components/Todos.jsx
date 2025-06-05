import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setTodos, deleteTodo, setLoading, setError } from '../features/todoSlice';
import { taskAPI } from '../services/api';
import EditTodoModal from './EditTodoModal';

export default function Todos() {
  const [modalOpen, setModalOpen] = useState(false);
  const [editdata, seteditdata] = useState();
  
  const todos = useSelector((state) => state.todo.todos);
  const loading = useSelector((state) => state.todo.loading);
  const error = useSelector((state) => state.todo.error);
  const dispatch = useDispatch();
  // Fetch todos on component mount
  useEffect(() => {
    fetchAllTodos();
  }, [dispatch]);

  const fetchAllTodos = async () => {
    try {
      dispatch(setLoading(true));
      const response = await taskAPI.getAllTasks();
      dispatch(setTodos(response.data));
    } catch (error) {
      dispatch(setError(error.response?.data?.message || 'Failed to fetch tasks'));
    } finally {
      dispatch(setLoading(false));
    }
  };

  const onEditClick = (item) => {
    seteditdata(item);
    setModalOpen(true);
  };

  const onDeleteClick = async (id) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      try {
        dispatch(setLoading(true));
        await taskAPI.deleteTask(id);
        dispatch(deleteTodo(id));
      } catch (error) {
        dispatch(setError(error.response?.data?.message || 'Failed to delete task'));
      } finally {
        dispatch(setLoading(false));
      }
    }
  };

  const getPriorityBadge = (priority) => {
    const priorityClasses = {
      'High': 'priority-high',
      'Medium': 'priority-medium',
      'Low': 'priority-low'
    };
    return (
      <span className={`priority-badge ${priorityClasses[priority]}`}>
        {priority}
      </span>
    );
  };

  const getStatusBadge = (status) => {
    const statusClasses = {
      'Todo': 'status-todo',
      'InProgress': 'status-inprogress',
      'Complete': 'status-complete',
      'Invalid': 'status-invalid'
    };

    return (
      <span className={`status-badge ${statusClasses[status]}`}>
        {status}
      </span>
    );
  };  if (loading) {
    return (
      <div className="todos-container">
        <h2 className="todos-title">Your Tasks</h2>
        <div className="empty-state">
          <h3>Loading tasks...</h3>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="todos-container">
        <h2 className="todos-title">Your Tasks</h2>
        <div className="empty-state">
          <h3>Error loading tasks</h3>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  if (todos.length === 0) {
    return (
      <div className="todos-container">
        <h2 className="todos-title">Your Tasks</h2>
        <div className="empty-state">
          <h3>No tasks yet!</h3>
          <p>Click the "Add New Task" button to get started</p>
        </div>
      </div>
    );
  }

  return (
    <div className="todos-container">
      <h2 className="todos-title">Your Tasks ({todos.length})</h2>
      <table className="todos-table">
        <thead>
          <tr>
            <th>Task Name</th>
            <th>Priority</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>        <tbody>
          {todos.map((todo) => (
            <tr key={todo._id}>
              <td>{todo.text}</td>
              <td>{getPriorityBadge(todo.priority)}</td>
              <td>{getStatusBadge(todo.status)}</td>              <td>
                <div className="action-buttons">
                  <button 
                    className="btn-action btn-edit" 
                    onClick={() => onEditClick(todo)}
                  >
                    Edit
                  </button>
                  <button 
                    className="btn-action btn-delete" 
                    onClick={() => onDeleteClick(todo._id)}
                    disabled={todo.status === 'Complete'}
                    style={{
                      opacity: todo.status === 'Complete' ? 0.5 : 1,
                      cursor: todo.status === 'Complete' ? 'not-allowed' : 'pointer'
                    }}
                  >
                    Delete
                  </button>
                </div>
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
