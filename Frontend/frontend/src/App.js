// src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TodoList from "./pages/TodoList";
import TodoDetails from "./pages/TodoDetail";
import CreateForm from "./pages/CreateForm";
import NotFound from "./pages/NotFound";
import ErrorBoundary from "./components/ErrorBoundary";
import HomePage from "./components/Homepage"; // Importing HomePage

const App = () => {
  return (
    
    <ErrorBoundary>
      <Router>
        <Routes>
          <Route path="/todolist" element={<TodoList />} />
          <Route path="/" element={<HomePage />} />
          <Route path="/todos/:id" element={<TodoDetails />} />
          <Route path="/create" element={<CreateForm />} /> 
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </ErrorBoundary>
   
  );
};

export default App;
