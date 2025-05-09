// src/components/pages/HomePage.jsx
import React from "react";
import Header from "../layouts/Header";
import SidebarLeft from "../layouts/SidebarLeft";
import { Box } from "@mui/material";
import MainChatArea from "../views/homeViews/MainChatArea";
import SidebarRight from "../layouts/SidebarRight";

const HomePage = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100vh", // Full viewport height
        overflow: "hidden", // Prevent page scrolling
      }}
    >
      {/* Fixed Header */}
      <Header />
      {/* Content Area */}
      <Box
        sx={{
          display: "flex",
          flex: 1, // Take up remaining space
          overflow: "hidden", // Prevent content overflow
        }}
      >
        {/* SidebarLeft */}
        <SidebarLeft />
        {/* MainChatArea */}
        <MainChatArea />
        {/* SidebarRight */}
        <SidebarRight />
      </Box>
    </Box>
  );
};

export default HomePage;