import React, { useState, useEffect } from "react";

const Modal = ({ show, onClose, onSave, initialTodo }) => {
  const [title, setTitle] = useState(initialTodo?.title || "");

  useEffect(() => {
    setTitle(initialTodo?.title || "");
  }, [initialTodo]);

  if (!show) {
    return null;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ ...initialTodo, title });
    onClose();
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>
          &times;
        </span>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <button type="submit">Save</button>
        </form>
      </div>
    </div>
  );
};

export default Modal;
