// src/App.jsx
import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "./components/pages/HomePage";
import TaskNodeLayout from "./components/layouts/TaskNodeLayout";
import TaskNode from "./components/pages/TaskNode";
import AddCompanyPage from "./components/pages/AddCompanyPage";
import AllCompaniesPage from "./components/pages/AllCompaniesPage";
import AddUserPage from "./components/pages/AddUserPage";
import AllUsersPage from "./components/pages/AllUsersPage";
import FormPage from "./components/pages/AssignFormPage";
import ResponsePage from "./components/pages/ResponsePage";
import PendingPage from "./components/pages/PendingPage";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />

      {/* Task Node layout */}
      <Route path="/task-node" element={<TaskNodeLayout />}>
        <Route index element={<TaskNode />} />
        <Route path="add-company" element={<AddCompanyPage />} />
        <Route path="all-companies" element={<AllCompaniesPage />} />
        <Route path="add-user" element={<AddUserPage />} />
        <Route path="all-users" element={<AllUsersPage />} />
        <Route path="forms" element={<FormPage />} />
        <Route path="responses" element={<ResponsePage />} />
        <Route path="pending" element={<PendingPage />} />
      </Route>
      {/* not found */}
      <Route path="*" element={<div>404 Not Found</div>} />
    </Routes>
  );
};

export default App;
