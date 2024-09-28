import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addTodo,updateTodo,deleteTodo,deleteAllTodo } from "./todoSlice";

const ToDoList = () => {
  const [text, setText] = useState("");
  
  const todos = useSelector((state) => state.todos);
  const dispatch = useDispatch();

  return (
    <div>
      <input type="text" value={text} onChange={e => { setText(e.target.value); }} />
            <button onClick={() => { dispatch(addTodo(text)); setText(""); }} >Add</button>
            <button onClick={() => { dispatch(deleteAllTodo()) }}> Delete All </button>
            
            <ul>
                {todos.map((todo) => (
                    <li key={todo.id}>
                        {todo.text}                                
                        <button onClick={(e) => {dispatch(updateTodo({ id:todo.id, text:e.target.value})); setText(todo.text); }}> update</button>
                        <button onClick={() => { dispatch(deleteTodo(todo.id)); }}> Delete </button>
                    </li>
                ))}
            </ul>
    </div>
  );
};

export default ToDoList;