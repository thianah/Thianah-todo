import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createTodo } from '../services/api';
import { toast, ToastContainer } from 'react-toastify'; // Import ToastContainer as well
import 'react-toastify/dist/ReactToastify.css'; // Import toastify styles
import "../styles/CreateForm.scss";
import Layout from '../components/Layout';

const CreateForm = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    priority: 'medium',
    dueDate: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await createTodo(formData);
      // Don't check for response.success, instead check if response exists
      if (response) {
        toast.success('Todo created successfully!');
        setTimeout(() => {
          navigate('/');
        }, 1500); // Give time for the toast to show before navigation
      } else {
        throw new Error('No response from server');
      }
    } catch (error) {
      console.error('Error creating todo:', error);
      setError(error?.response?.data?.message || 'Failed to create todo');
      toast.error('Failed to create todo. Please try again.');
    } finally {
      setLoading(false);
    }
  };


  return (
    <>
    <Layout>
      <form onSubmit={handleSubmit} className="create-todo-form">
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            placeholder="Enter todo title"
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            placeholder="Enter todo description"
          />
        </div>

        <div className="form-group">
          <label htmlFor="priority">Priority</label>
          <select
            id="priority"
            name="priority"
            value={formData.priority}
            onChange={handleChange}
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="dueDate">Due Date</label>
          <input
            type="datetime-local"
            id="dueDate"
            name="dueDate"
            value={formData.dueDate}
            onChange={handleChange}
          />
        </div>

        {error && <div className="error-message">{error}</div>}

        <button type="submit" className="submit-btn" disabled={loading}>
          {loading ? 'Creating...' : 'Create Todo'}
        </button>
      </form>

      {/* Toast Container to display toasts */}
      <ToastContainer />
      </Layout>
    </>
    
  );
};

export default CreateForm;
