import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TodoList from "./components/TodoList";
import TodoDetail from "./components/TodoDetail";
import NotFound from "./components/NotFound";

const App = () => {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<TodoList />} />
          <Route path="/todos" element={<TodoList />}>
            <Route path=":id" element={<TodoDetail />} />
          </Route>
          <Route path="/test" element={<div>404 Error page</div>} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
