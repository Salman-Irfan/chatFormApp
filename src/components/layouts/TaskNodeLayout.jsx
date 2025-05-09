import React from "react";
import { Outlet } from "react-router-dom";
import TaskNodeNavbar from "./TaskNodeNavbar.jsx";

const TaskNodeLayout = () => {
  return (
    <div>
      <TaskNodeNavbar />
      <main className="p-4">
        <Outlet />
      </main>
    </div>
  );
};

export default TaskNodeLayout;
