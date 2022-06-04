import React,{useState} from 'react';
import './styles.css';
import {InputTodo} from './components/InputTodo';


// 三つのエリアに分ける。
export const App = () => {
  // 追加機能
  const [todoTitle, setTodoTitle] = useState('');

  // 追加などの際の状態変化
  const [todos, setTodos]  = useState([]);

  const [todoId, setTodoId] = useState(0);

  // 編集画面への切り替え

  const [isEditable, setIsEditable] = useState(false);

  // 編集対象のtodoのid状態を管理
  const [editId, setEditId] = useState('');

  // 編集フォームの新しいタイトル
  const [newTitle, setNewTitle] = useState('');

  // onChangeに対する関数
  const onChangeTodoText = (event) => setTodoTitle(event.target.value);
  
  const resetFormInput = () => {
    setTodoTitle('');
  }

  // onClickに対する関数
  const onClickAdd = () => {
    if (todoTitle === "") return;
    setTodos([...todos, { id: todoId, title: todoTitle }]);
    setTodoId(todoId + 1);
    resetFormInput();
  };

  // onClickDeleteに対する関数
  const onClickDelete = (index) => {
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
  };
// 編集の切り替え
  const handleOpenEditForm = (todo) => {
    setIsEditable(true);
    // 編集対象のtodoのidを使ってeditIdの値を更新
    setEditId(todo.id);
    // 編集対象のtodoタイトルをinputに表示
    setNewTitle(todo.title);
  };
  
  // 編集用inputの入力値に応じてstateを更新
  const handleEditFormChange = (e) => {
    setNewTitle(e.target.value)
  }

  const handleCloseEditForm = () => {
    setIsEditable(false);
    // 編集を終えた時にidのstateを初期化
    setEditId('');
  };
  
  
  

  // 編集内容をtodoリストの配列に加える
  const handleEditTodo = () => {
    const newArray = todos.map((todo) => todo.id === editId ? 
    { ...todo, title: newTitle } : todo
    );
    setTodos(newArray)
    // todoリストの更新後にstateを初期化
    setNewTitle('');
    setEditId();
    handleCloseEditForm();
  };

  return (
  <>
  <div className="main-title">
    <p>ToDo-List</p>
  </div>
  
  {isEditable ? (

  <>
  <div className="edit-contents">
    <input type="text" label="新しいタイトル" value={newTitle} onChange={handleEditFormChange}/>
    <button className="upload-button" onClick={handleEditTodo}>更新</button>
    <button  className="cancel-button" onClick={handleCloseEditForm}>キャンセル</button>
  </div>
  </>
  
  ) : (
  
  <InputTodo 
  todoTitle={todoTitle} 
  onChange={onChangeTodoText} 
  onClick={onClickAdd}/>
  
  )}
  
  <div className="list-contents">
    <ul>
      {todos.map((todo,index) => {
        return (
        <li className="list-row" key ={todo.id}>
        <span>{todo.title}</span>
        <select className= "box-button">
          <option value="notStarted">未着手</option>
          <option value="inProgress">作業中</option>
          <option value="done">完了</option>
        </select>
        <button className="edit-button" onClick={() => handleOpenEditForm(todo)}>編集</button>
        <button className="delete-button" onClick={() => onClickDelete(index)}>削除</button>
      </li>
        );
      })}
    </ul>
  </div> 
  </> 
  ); 
};


