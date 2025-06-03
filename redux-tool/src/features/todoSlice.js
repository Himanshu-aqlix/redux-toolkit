import { createSlice, nanoid } from "@reduxjs/toolkit";


const initialState = {
  todos: [{ id: 1, text: "hello world", priority: "Low" }]
};

export const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    
    addtodo: (state, action) => {
      const todo = {
        id: nanoid(),
        text: action.payload.text,
        priority: action.payload.priority,
        status:action.payload.status
      };
      state.todos.push(todo);
    },

   
    removetodo: (state, action) => {
      state.todos = state.todos.filter((todo) => todo.id !== action.payload);
    },

    // Edit based on ID, can update text and/or priority
    edittodo: (state, action) => {
     
    }
  }
});


export const { addtodo, removetodo, edittodo } = todoSlice.actions;


export default todoSlice.reducer;
