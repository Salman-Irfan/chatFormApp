// src/components/layouts/TaskNodeNavbar.jsx
import React from "react";
import { Link } from "react-router-dom";

const TaskNodeNavbar = () => {
  return (
    <nav className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-4 shadow-md">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-bold">Task Management</h1>
        <div className="space-x-4">
          <Link to="/task-node/add-company" className="hover:underline">1. Add Company</Link>
          <Link to="/task-node/all-companies" className="hover:underline">2. All Company</Link>
          <Link to="/task-node/add-user" className="hover:underline">3. Add User</Link>
          <Link to="/task-node/all-users" className="hover:underline">4. All User</Link>
          <Link to="/task-node/assign-form" className="hover:underline">5. Assign Forms</Link>
          <Link to="/task-node/all-assigned-form" className="hover:underline">6. All Assigned Forms</Link>
          <Link to="/task-node/responses" className="hover:underline">6. Form Responses</Link>
        </div>
      </div>
    </nav>
  );
};

export default TaskNodeNavbar;
