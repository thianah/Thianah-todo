import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const TodoDetail = () => {
  const { id } = useParams();
  const [todo, setTodo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTodo = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await axios.get(
          `https://jsonplaceholder.typicode.com/todos/${id}`
        );
        setTodo(res.data);
      } catch (error) {
        console.error("Error fetching todo:", error);
        setError("Failed to load todo. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchTodo();
  }, [id]);

  if (loading) {
    return <h2>Loading...</h2>;
  }

  if (error) {
    return <h2>{error}</h2>;
  }

  return (
    <div>
      <h1>Todo Detail</h1>
      <p>
        <strong>ID:</strong> {todo.id}
      </p>
      <p>
        <strong>Title:</strong> {todo.title}
      </p>
      <p>
        <strong>Completed:</strong> {todo.completed ? "yes" : "No"}
      </p>
    </div>
  );
};

export default TodoDetail;
