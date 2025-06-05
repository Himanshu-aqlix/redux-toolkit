import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  todos: [],
  loading: false,
  error: null
};

export const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
    setTodos: (state, action) => {
      state.todos = action.payload;
    },
    addTodo: (state, action) => {
      state.todos.unshift(action.payload);
    },
    updateTodo: (state, action) => {
      const index = state.todos.findIndex(todo => todo._id === action.payload._id);
      if (index !== -1) {
        state.todos[index] = action.payload;
      }
    },
    deleteTodo: (state, action) => {
      state.todos = state.todos.filter(todo => todo._id !== action.payload);
    }
  }
});

export const { setLoading, setError, clearError, setTodos, addTodo, updateTodo, deleteTodo } = todoSlice.actions;
export default todoSlice.reducer;
