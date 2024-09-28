import { createSlice } from "@reduxjs/toolkit";

const todoSlice = createSlice({
  name: "todos",
  initialState: [],
  reducers: {
    addTodo: (state, action) => {
      const newTodo = {
        id: Date.now(),
        text: action.payload,
        completed: false,
      };
      state.push(newTodo);
    },

    updateTodo: (state, action) => {
      const index = state.findIndex(item => item.id === action.payload.id);
      const updatedState = [...state];
      updatedState[index].text = action.payload.text;
    },

    deleteTodo: (state, action) => {
      const index = state.findIndex((todo) => todo.id === action.payload);
      if (index !== -1) {
        state.splice(index, 1);
      }
    },
    
    deleteAllTodo: (state, action) => {
      state.splice(0);
    },
  },
});
export const { addTodo, updateTodo, deleteTodo, deleteAllTodo } = todoSlice.actions;
export default todoSlice.reducer;