import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Pagination from "./Pignation";
import Modal from "./Modal";
import { useNavigate } from "react-router-dom";

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [todosPerPage] = useState(10);
  const [showModal, setShowModal] = useState(false);
  const [currentTodo, setCurrentTodo] = useState(null);
  const [newTodoTitle, setNewTodoTitle] = useState("");
  const [showAddTodoInput, setShowAddTodoInput] = useState(false);

  useEffect(() => {
    const fetchTodos = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await axios.get(
          "https://jsonplaceholder.typicode.com/todos"
        );
        setTodos(res.data);
      } catch (error) {
        console.error("Error fetching todos:", error);
        setError("Failed to load todos. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchTodos();
  }, []);

  // Get current todos
  const indexOfLastTodo = currentPage * todosPerPage;
  const indexOfFirstTodo = indexOfLastTodo - todosPerPage;
  const currentTodos = todos.slice(indexOfFirstTodo, indexOfLastTodo);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Create or update todo
  const saveTodo = (todo) => {
    if (todo.id) {
      // Update todo
      setTodos(todos.map((t) => (t.id === todo.id ? todo : t)));
    } else {
      // Create new todo
      const newTodo = { ...todo, id: todos.length + 1 };
      setTodos([newTodo, ...todos]);
      setNewTodoTitle("");
      setShowAddTodoInput(false);
    }
  };

  // Delete todo
  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const handleAddTodo = () => {
    saveTodo({ title: newTodoTitle });
  };

  if (loading) {
    return <h2>Loading...</h2>;
  }

  if (error) {
    return <h2>{error}</h2>;
  }

  return (
    <div>
      <h1>Todo List</h1>
      <button onClick={() => setShowAddTodoInput(!showAddTodoInput)}>
        Add Todo
      </button>
      {showAddTodoInput && (
        <div className="add-todo-container">
          <input
            type="text"
            value={newTodoTitle}
            onChange={(e) => setNewTodoTitle(e.target.value)}
            placeholder="Enter new todo"
            required
          />
          <button onClick={handleAddTodo}>Save</button>
        </div>
      )}
      <ul>
        {currentTodos.map((todo) => (
          <li key={todo.id}>
            <Link to={`/todos/${todo.id}`}>{todo.title}</Link>
            <button
              onClick={() => {
                setShowModal(true);
                setCurrentTodo(todo);
              }}
            >
              Edit Todo
            </button>
            <button onClick={() => deleteTodo(todo.id)}>Delete</button>
          </li>
        ))}
      </ul>
      <Pagination
        todosPerPage={todosPerPage}
        totalTodos={todos.length}
        paginate={paginate}
      />
      <Modal
        show={showModal}
        onClose={() => setShowModal(false)}
        onSave={saveTodo}
        initialTodo={currentTodo}
      />
    </div>
  );
};

export default TodoList;
