// src/components/layouts/TaskNavbar.jsx
import React from "react";
import { Link } from "react-router-dom";

const TaskNodeNavbar = () => {
  return (
    <nav className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-4 shadow-md">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-bold">Task Management</h1>
        <div className="space-x-4">
          <Link to="/task-node" className="hover:underline">
            Dashboard
          </Link>
          <Link to="/task-node/forms" className="hover:underline">
            Forms
          </Link>
          <Link to="/task-node/responses" className="hover:underline">
            Responses
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default TaskNodeNavbar;
