import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getTodoById } from "../services/api";
import "../styles/TodoDetail.scss";// Import the SCSS file
import Layout from "../components/Layout";

const TodoDetails = () => {
    const { id } = useParams();
    const [todo, setTodo] = useState(null);
  
    useEffect(() => {
      const fetchTodo = async () => {
        const data = await getTodoById(id);
        setTodo(data);
      };
      fetchTodo();
    }, [id]);
  
    if (!todo) return <p className="loading">Loading...</p>;
  
    return (
        <Layout>
      <div className="todo-details">
        <h1>{todo.title}</h1>
        <p className="description">{todo.description}</p>
        <div className="details">
          <p>
            <strong>Priority:</strong> {todo.priority}
          </p>
          <p>
            <strong>Due Date:</strong>{" "}
            {new Date(todo.dueDate).toLocaleDateString()}
          </p>
        </div>
      </div>
      </Layout>
    );
  };
  
  export default TodoDetails;