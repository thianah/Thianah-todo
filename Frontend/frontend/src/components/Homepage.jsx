// src/components/HomePage.js
import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/HomePage.scss';
import "./Layout"
import Layout from './Layout';
const HomePage = () => {
  return (
    <Layout>
    <div className="home-page">
      <section className="intro">
        <h1>Welcome to My To-Do App!</h1>
        <p>
          Hi, I'm Thianah, and I'm excited to share with you this simple, yet
          powerful To-Do app that helps you stay organized and on top of your
          tasks.
        </p>
        <p>
          Whether you're managing your daily chores or handling a project at
          work, this app allows you to create, view, and manage your to-dos with
          ease.
        </p>
      </section>

      <section className="features">
      <h2>Features of the To-Do App:</h2>
          <ul>
            <li>Create new tasks with title, description, priority, and due date</li>
            <li>View all your to-dos in a list format</li>
            <li>Click on any to-do to see more details</li>
            <li>Stay organized and mark tasks as completed</li>
            <li>page listing all your todos with pagination enabled</li>
            <li>Search and Filter functionality</li>
            <li>a page that displays the details of a single todo when clicked, using nested routes</li>
            <li>Error Boundary to catch JavaScript errors in the app</li>
            <li> 404 error page for unknown routes</li>
            <li>Good Layout, consistent UI design, and accessibility features to enhance user experience</li>
          </ul>
      </section>

      <section className="cta">
        <h2>Ready to get started?</h2>
        <Link to="/create" className="create-btn">
          Create Your First Todo
        </Link>
      </section>
    </div>
    </Layout>
  );
};

export default HomePage;
