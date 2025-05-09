// src/App.jsx
import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "./components/pages/HomePage";
import TaskNodeLayout from "./components/layouts/TaskNodeLayout";
import TaskNode from "./components/pages/TaskNode";
import FormPage from "./components/pages/FormPage";
import ResponsePage from "./components/pages/ResponsePage";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      
      {/* All /task-node routes use the layout with navbar */}
      <Route path="/task-node" element={<TaskNodeLayout />}>
        <Route index element={<TaskNode />} />
        <Route path="forms" element={<FormPage />} />
        <Route path="responses" element={<ResponsePage />} />
      </Route>
    </Routes>
  );
};

export default App;
