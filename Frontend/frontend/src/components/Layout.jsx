// src/components/Layout.js
import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Layout.scss';

const Layout = ({ children }) => {
  return (
    <div className="layout">
      {/* Header Section */}
      <header className="header">
      <div className="logo">
          <img src="Thianah.png" alt="Logo" className="logo-img" />
        </div>
        <nav>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/todolist">View To-Dos</Link></li>
            <li><Link to="/create">Create Todo</Link></li>
          </ul>
        </nav>
      </header>

      {/* Page Content (children) */}
      <main className="main-content">
        {children}
      </main>

      {/* Footer Section */}
      <footer className="footer">
        <p>© 2024 Thianah. All Rights Reserved.</p>
      </footer>
    </div>
  );
};

export default Layout;
