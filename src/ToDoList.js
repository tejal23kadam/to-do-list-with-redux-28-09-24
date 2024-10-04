import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addTodo, updateTodo, deleteTodo, deleteAllTodo, toggleComplete } from "./todoSlice";
import './ToDoCss.css';

const ToDoList = () => {
  const [text, setText] = useState("");
  const [selectedId, setSelectedID] = useState(-1);
  const [idEdit, setIdEdit] = useState(null);
  const [completedToDo, setCompletedToDo] = useState('All');
  const [editing, setEditing] = useState(false);
  const [count, setCount] = useState(0);
  let editMode = {};

  const setEditMode = () => {
    if (editing) {
      editMode.display = 'none';
      setIdEdit(null);
    }
    else {
      editMode.display = 'block';
      setIdEdit(null);
    }
  }

  const todos = useSelector((state) => state.todos);
  const dispatch = useDispatch();

  return (
    <div className='main'>
      <div>
        <input type="text" value={text} onChange={e => { setText(e.target.value); }} />
        <button onClick={() => { dispatch(addTodo(text)); setText(""); }} >Add</button>
        <button onClick={() => { dispatch(deleteAllTodo()) }}> Delete All </button>
      </div>
      <div >
        <button onClick={() => setCompletedToDo(null)} >All</button>
        <button onClick={() => setCompletedToDo(true)}> Completed </button>
        <button onClick={() => setCompletedToDo(false)}> InComplete </button>

      </div>

      <ul>     

        {(todos && todos.length) ? (
          // todos.filter(item => item.completed === 'All').map((item, idx) =>
            todos.map((item, idx) =>
            <li key={item.id} style={{ textDecoration: item.completed ? "line-through" : "none" }}>
              {
                (selectedId === idx) ? (
                  <div>
                    <div style={{ display: idEdit === item.id ? 'block' : 'none' }}>
                      <input type='text' value={item.text} onChange={(e) => dispatch(updateTodo({ id: item.id, text: e.target.value }))} />
                    </div>
                    <div className='updated-listing' >
                      <div>
                        <p style={{ display: idEdit === item.id ? 'none' : 'block' }}>{item.text}</p>
                      </div>
                      <div>
                        {
                          (editing) ? (
                            <button onClick={() => { setEditMode(); setEditing(false) }}>save</button>
                          )
                            :
                            (
                              <button onClick={() => { setSelectedID(idx); setIdEdit(item.id); setEditing(true) }}
                                onChange={(e) => dispatch(updateTodo({ id: item.id, text: e.target.value }))}>edit</button>
                            )
                        }
                        <button onClick={() => { dispatch(deleteTodo(item.id));; setCount(count - 1); }}>Delete</button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div style={{ editing }} className='normal-listing'>
                    <div >
                      <p>{item.text}</p>

                    </div>
                    <div>
                      <button onClick={() => dispatch(toggleComplete(item.id))}>
                        {item.completed ? "Mark Incomplete" : "Mark Complete"}{" "}
                      </button>
                      <button onClick={() => { setSelectedID(idx); setIdEdit(item.id); setEditing(true) }}
                        onChange={(e) => dispatch(updateTodo({ id: item.id, text: e.target.value }))}>edit</button>

                      <button onClick={() => { dispatch(deleteTodo(item.id)); setCount(count - 1); }}>Delete</button>
                    </div>
                  </div>
                )
              }
            </li>
          )) : <h1>"No todos, yay!"</h1>
        }
      </ul >
    </div>
  );
};

export default ToDoList;