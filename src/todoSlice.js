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
    toggleComplete: (state, action) => {
      const todo = state.find((todo) => todo.id === action.payload);
      if (todo) {
        todo.completed = !todo.completed;
      }
    },
    updateTodo: (state, action) => {
      const index = state.findIndex((todo) => todo.id === action.payload.id);
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
      state.splice(0); //if you don't specify the end point of an array it will delete all the array starting from the given position.
    },
  },
});
export const { addTodo, updateTodo, deleteTodo, deleteAllTodo, toggleComplete} = todoSlice.actions;
export default todoSlice.reducer;