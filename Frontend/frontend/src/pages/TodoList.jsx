import React, { useState, useEffect } from "react";
import { getTodos, deleteTodo, updateTodo } from "../services/api"; // Import delete and update APIs
import "../styles/TodoList.scss";
import Layout from "../components/Layout";

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("");
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({
    title: "",
    description: "",
    priority: "low",
    dueDate: "",
  });

  // Fetch todos on page load or whenever page, search, or filter changes
  useEffect(() => {
    const fetchTodos = async () => {
      const data = await getTodos(page, 10, search, filter);
      setTodos(data.todos);
      setTotal(data.total);
    };
    fetchTodos();
  }, [page, search, filter]);

  // Handle delete
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this todo?")) {
      try {
        await deleteTodo(id);
        setTodos((prevTodos) => prevTodos.filter((todo) => todo._id !== id));
      } catch (error) {
        console.error("Error deleting todo:", error);
      }
    }
  };

  // Start editing
  const startEditing = (todo) => {
    setEditingId(todo._id);
    setEditData({
      title: todo.title,
      description: todo.description,
      priority: todo.priority || "low",
      dueDate: todo.dueDate ? new Date(todo.dueDate).toISOString().slice(0, 16) : "",
    });
  };

  // Cancel editing
  const cancelEditing = () => {
    setEditingId(null);
    setEditData({
      title: "",
      description: "",
      priority: "low",
      dueDate: "",
    });
  };

  // Save updates
  const saveEditing = async () => {
    try {
      const updatedTodo = await updateTodo(editingId, {
        ...editData,
        dueDate: editData.dueDate ? new Date(editData.dueDate).toISOString() : null,
      });
      setTodos((prevTodos) =>
        prevTodos.map((todo) => (todo._id === editingId ? updatedTodo : todo))
      );
      cancelEditing();
    } catch (error) {
      console.error("Error updating todo:", error);
    }
  };

  return (
    <Layout>
      <div className="todo-list">
        <h1>Todos</h1>
        <input
          type="text"
          placeholder="Search todos"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select value={filter} onChange={(e) => setFilter(e.target.value)}>
          <option value="">All</option>
          <option value="completed">Completed</option>
          <option value="pending">Pending</option>
        </select>

        <ul>
          {todos.map((todo) => (
            <li key={todo._id}>
              {editingId === todo._id ? (
                <>
                  <input
                    type="text"
                    value={editData.title}
                    onChange={(e) => setEditData({ ...editData, title: e.target.value })}
                    placeholder="Edit title"
                  />
                  <textarea
                    value={editData.description}
                    onChange={(e) =>
                      setEditData({ ...editData, description: e.target.value })
                    }
                    placeholder="Edit description"
                  />
                  <select
                    value={editData.priority}
                    onChange={(e) => setEditData({ ...editData, priority: e.target.value })}
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                  <input
                    type="datetime-local"
                    value={editData.dueDate}
                    onChange={(e) =>
                      setEditData({ ...editData, dueDate: e.target.value })
                    }
                  />
                  <button onClick={saveEditing}>Save</button>
                  <button onClick={cancelEditing}>Cancel</button>
                </>
              ) : (
                <>
                  <a href={`/todos/${todo._id}`}>{todo.title}</a>
                  <button className="edit" onClick={() => startEditing(todo)}>Edit</button>
                  <button className="delete" onClick={() => handleDelete(todo._id)}>Delete</button>
                </>
              )}
            </li>
          ))}
        </ul>

        <p>Total Todos: {total}</p>
        <div>
          <button onClick={() => setPage(page > 1 ? page - 1 : 1)}>Prev</button>
          <button onClick={() => setPage(page + 1)}>Next</button>
        </div>
      </div>
    </Layout>
  );
};

export default TodoList;
