import React from 'react';

export const InputTodo = (props) => {
  const {todoTitle,onChange, onClick} = props;
  return (
    <div className="add-contents">
      <input placeholder="ToDoを入力" value={todoTitle} onChange={onChange}/>
      <button onClick={onClick}>追加</button>
    </div>
  );
}