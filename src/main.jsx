import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
// import './index.css'
import App from "./App.jsx";
import { CssBaseline } from "@mui/material";
import { ThemeProvider } from "@emotion/react";
import theme from "./theme/customTheme.js";
import { BrowserRouter } from "react-router-dom";
createRoot(document.getElementById("root")).render(
  <>
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <App />
      </ThemeProvider>
    </BrowserRouter>
  </>
);
