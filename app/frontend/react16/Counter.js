import React, { useState, useReducer } from 'react';
import uuidv1 from 'uuid/v1';

const Counter = () => {
  const [like, updateLike] = useState(100);

  const incrementLikeCount = () => {
    updateLike( like + 1);
  };

  const todoReducer = (state, action) => {
    if (action.type === 'ADD_TODO') {
      return [...state, action.payload ];
    } else if (action.type === 'REMOVE_TODO') {
      return state.filter(todo => todo.id != action.payload.todoId);
    }
    return state;
  };

  const initialState = [
    { id: uuidv1(), name: 'todo 1' }
  ];

  const [todos, todoDispatch] = useReducer(todoReducer, initialState);

  const [todoName, updateTodoName] = useState('');
  const setTodoName = (e) => {
    updateTodoName(e.target.value);
  };

  const saveTodo = () => {
    todoDispatch({
      type: 'ADD_TODO',
      payload: {
        id: uuidv1(),
        name: todoName,
      }
    });

    updateTodoName('');
  };

  const removeTodo = (todoId) => {
    todoDispatch({
      type: 'REMOVE_TODO',
      payload: {
        todoId: todoId,
      }
    })
  };

  return (
    <div>
      Counter component

      {
        like
      } Likes

      <button onClick={incrementLikeCount}>
        Increment
      </button>


      <div className="card">
        <h5 className="card-header">Task list using Reducer</h5>
        <div className="card-body">
          <h5 className="card-title">Tasks</h5>
          <ul className="list-group">
            {
              todos.map((todo, index) => (
                <li className="list-group-item">
                  {todo.name}

                  <a onClick={removeTodo.bind(null, todo.id)} className="float-right" style={{ cursor: 'pointer' }}>
                    X
                  </a>
                </li>
              ))
            }


          </ul>


          <input type="text" value={todoName} onChange={setTodoName}/>
          <button type="button" className="btn btn-success" onClick={saveTodo}>
            Add todo</button>

        </div>
      </div>


    </div>
  );
};

export default Counter;
